import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null
    );

    const signin = (newUser, callback) => {
        let userObj = {
            id: newUser.user.id,
            accessToken: newUser.accessToken,
        }
        setUser(userObj);
        Cookies.set("auth", JSON.stringify(userObj));

        callback();
    }

    const signout = (callback) => {
        setUser(null);
        Cookies.remove("auth");
        callback();
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;