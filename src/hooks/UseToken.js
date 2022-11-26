import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const useToken = email => {
    const { logOut } = useContext(AuthContext);
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken);
                    }
                    else logOut()
                });
        }
    }, [email, logOut]);
    return [token];
}

export default useToken;