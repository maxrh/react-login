import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const Navigation = () => {
    const auth = useAuth();

    return ( 
        <nav>
            <Link to="/">Home</Link>{" "}
            <Link to="about">About</Link>{" "}
            <Link to="statements">Statements</Link>{" "}
            {auth.user && <Link to="/">Secrets</Link>}{" "}
            <Link to="register">Register</Link>{" "}
            <Link to="login">Login</Link>
        </nav>
    );
}
 
export default Navigation;