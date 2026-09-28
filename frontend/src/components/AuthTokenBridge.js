import { useAuth0 } from '@auth0/auth0-react';
import { setIdTokenGetter } from '../api/axios.js';

const AuthTokenBridge = () => {
  const { getIdTokenClaims } = useAuth0();
  // Set during render so it is in place before any child effect issues a request.
  setIdTokenGetter(async () => (await getIdTokenClaims())?.__raw);
  return null;
};

export default AuthTokenBridge;
