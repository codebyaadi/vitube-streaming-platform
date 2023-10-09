import { useEffect, useState } from 'react';
import useUserInfoFromToken from '../../hooks/userinfo'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [logged, setLogged] = useState(false);
    const userInfo = useUserInfoFromToken();

    useEffect(() => {
        if (userInfo.name != null) {
            console.log(userInfo.name)
            setLogged(true);
            console.log("Inside", logged)
        }
    }, [userInfo.name]); // Add userInfo.name as a dependency
    

    console.log("Outside", logged)

    if (logged == false) {
        return null
    }
  return (
    logged == true ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoute