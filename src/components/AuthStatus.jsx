import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthStatus = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const handleSignout = () => {
        auth.signout(() => navigate("/"));
    };

    return !auth.user ? ( 
        <button onClick={() => navigate("/login")}>Login</button>

     ) : ( <p>Welcome! <button onClick={handleSignout}>Logout</button>{" "}</p> );
}
 
export default AuthStatus;