import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const Navigation = () => {
    const auth = useAuth();

    return ( 
        <nav>
            <Link to="/">Home</Link>{" "}
            <Link to="about">About</Link>{" "}
            <Link to="statements">Statements</Link>{" "}
            {auth.user && <Link to="secrets">Secrets</Link>}{" "}
            {!auth.user && <Link to="register">Register</Link>}{" "}
            {!auth.user && <Link to="login">Login</Link>}{" "}
            {auth.user && <Link to="profile">Profile</Link>}{" "}

        </nav>
    );
}
 
export default Navigation;