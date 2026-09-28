const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

const emailList = (value) =>
    (value || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

const ADMIN_EMAILS = emailList(process.env.ADMIN_EMAILS);

const jwks = AUTH0_DOMAIN && jwksClient({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
});

const getKey = (header, callback) => {
    jwks.getSigningKey(header.kid, (err, key) => callback(err, key && key.getPublicKey()));
};

// Verifies the Auth0 ID token sent by the SPA and sets req.user = { email, name }.
const requireAuth = (req, res, next) => {
    if (!jwks || !AUTH0_CLIENT_ID) {
        console.error("AUTH0_DOMAIN / AUTH0_CLIENT_ID not configured");
        return res.status(500).json({ message: "Authentication not configured" });
    }

    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
        return res.status(401).json({ message: "Login required" });
    }

    jwt.verify(token, getKey, {
        algorithms: ["RS256"],
        audience: AUTH0_CLIENT_ID,
        issuer: `https://${AUTH0_DOMAIN}/`,
    }, (err, claims) => {
        if (err || !claims.email) {
            return res.status(401).json({ message: "Invalid or expired login" });
        }
        req.user = {
            email: claims.email,
            name: claims.name || claims.email,
            emailVerified: claims.email_verified === true,
        };
        next();
    });
};

const requireAdmin = [requireAuth, (req, res, next) => {
    if (!req.user.emailVerified || !ADMIN_EMAILS.includes(req.user.email.toLowerCase())) {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
}];

module.exports = { requireAuth, requireAdmin, emailList };
