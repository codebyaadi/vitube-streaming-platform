// useUserInfoFromToken.js
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookies';

function useUserInfoFromToken() {
  const [userInfo, setUserInfo] = useState({
    userId: null,
    name: null,
    email: null,
    username: null,
    profile: null,
  });

  useEffect(() => {
    const token = Cookies.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      setUserInfo({
        userId: decodedToken.userId,
        name: decodedToken.name,
        email: decodedToken.email,
        username: decodedToken.username,
        profile: decodedToken.profile,
      });
    } else {
      setUserInfo({
        id: null,
        name: null,
        email: null,
        username: null,
        profile: null,
      });
    }
  }, []);

  return userInfo;
}

export default useUserInfoFromToken;
