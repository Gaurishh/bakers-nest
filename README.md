# 🍰 Baker's Nest

A full-stack e-commerce platform for bakery products, built with React frontend and Node.js backend, featuring secure payment processing and comprehensive product management.

**🌐 Live Demo:** [https://bakers-nest.onrender.com](https://bakers-nest.onrender.com)

## ✨ Features

### 🛍️ E-commerce Functionality

- **Product Catalog**: Browse and search bakery products by category
- **Shopping Cart**: Add/remove items with quantity management
- **Secure Payments**: Integrated Razorpay payment gateway
- **Order Management**: Track order history and status
- **Responsive Design**: Mobile-first approach for all devices

### 🔐 Authentication & Security

- **User Authentication**: Secure login and registration system
- **Payment Verification**: Cryptographic signature verification for transactions
- **CORS Protection**: Cross-origin resource sharing configuration
- **Environment Variables**: Secure configuration management

### 📱 Admin Panel

- **Product Management**: Add, edit, delete, and toggle product visibility
- **Inventory Control**: Manage product variants and pricing
- **Order Processing**: View and manage customer orders
- **Image Upload**: Cloudinary integration for product images

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Material-UI (MUI)** - Professional UI component library
- **Bootstrap 5** - Responsive CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Multer** - File upload middleware
- **Cloudinary** - Cloud image management
- **Razorpay** - Payment gateway integration

### DevOps & Deployment

- **Render** - Cloud platform for hosting
- **Environment Variables** - Secure configuration
- **Health Checks** - Uptime monitoring
- **Auto-deployment** - Continuous integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Razorpay account for payments
- Cloudinary account for image storage

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bakers-nest
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` file in the backend directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Database Setup**
   - Ensure MongoDB is running
   - Update the connection string in your environment variables

### Running the Application

#### Development Mode

```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm start
```

#### Production Mode

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## 📁 Project Structure

```
bakers-nest/
├── backend/                 # Backend API server
│   ├── models/             # Database models
│   │   ├── productModel.js # Product schema
│   │   ├── orderModel.js   # Order schema
│   │   └── userModel.js    # User schema
│   ├── routes/             # API endpoints
│   │   ├── productsRoute.js # Product management
│   │   ├── ordersRoute.js  # Order processing
│   │   └── uploadRoute.js  # File uploads
│   ├── server.js           # Main server file
│   ├── db.js              # Database connection
│   └── package.json       # Backend dependencies
├── frontend/               # React frontend application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── render.yaml            # Deployment configuration
└── README.md              # Project documentation
```

## 🔌 API Endpoints

### Products

- `GET /api/products/getallproducts` - Retrieve all products
- `GET /api/products/getproductsbypage` - Paginated product listing
- `POST /api/products/addproduct` - Add new product
- `POST /api/products/editproduct` - Update product
- `POST /api/products/deleteproduct` - Remove product
- `POST /api/products/productvisibility` - Toggle product visibility

### Orders

- `POST /api/orders/placeOrder` - Create new order
- `POST /api/orders/verify` - Verify payment
- `POST /api/orders/getuserorders` - Get user order history

### File Upload

- `POST /api/upload` - Upload product images

## 💳 Payment Integration

The application integrates with **Razorpay** for secure payment processing:

- **Order Creation**: Generates payment orders with calculated amounts
- **Payment Verification**: Cryptographic signature verification
- **Transaction Recording**: Stores successful transactions in database
- **Error Handling**: Comprehensive error handling for failed payments

## 🚀 Deployment

The application is deployed on **Render** with the following configuration:

- **Backend Service**: Node.js web service with health checks
- **Frontend Service**: Static site with automatic builds
- **Auto-deployment**: Automatic deployment on code changes
- **Environment Variables**: Secure configuration management

## 🔧 Configuration

### Backend Environment Variables

- `NODE_ENV`: Environment (production/development)
- `PORT`: Server port (default: 8000)
- `MONGODB_URI`: MongoDB connection string
- `RAZORPAY_KEY_ID`: Razorpay public key
- `RAZORPAY_KEY_SECRET`: Razorpay secret key
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Frontend Environment Variables

- `REACT_BACKEND_APP_API_URL`: Backend API endpoint

## 📱 Features in Detail

### Product Management

- **Categories**: Organize products by type (cakes, breads, pastries, etc.)
- **Variants**: Multiple size and flavor options
- **Pricing**: Dynamic pricing for different variants
- **Images**: High-quality product photography
- **Visibility Control**: Show/hide products as needed

### Shopping Experience

- **Responsive Design**: Optimized for all device sizes
- **Search & Filter**: Easy product discovery
- **Cart Management**: Persistent shopping cart
- **Checkout Process**: Streamlined payment flow

### Admin Capabilities

- **Dashboard**: Overview of products and orders
- **Inventory Management**: Real-time stock updates
- **Order Processing**: Manage customer orders
- **Content Management**: Update product information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:

- **Live Demo**: [https://bakers-nest.onrender.com](https://bakers-nest.onrender.com)
- **Issues**: Please use the GitHub issues page
- **Documentation**: Refer to this README and code comments

## 🙏 Acknowledgments

- **Razorpay** for payment processing
- **Cloudinary** for image management
- **Material-UI** for beautiful components
- **MongoDB** for database services
- **Render** for hosting and deployment

---

**🍰 Made with love for all the bakers and dessert lovers out there! 🍰**
