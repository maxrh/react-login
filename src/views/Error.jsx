import { 
    useRouteError, 
    isRouteErrorResponse,
    Link, 
    useNavigate, 
    Form
} from "react-router-dom";
import { useEffect } from "react";

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        if (isRouteErrorResponse(error) && error.status === 401) {
            setTimeout(() => {
                navigate("/login", { state: { from: { pathname: error.data.from }}});
            }, 1000);
        }
    }, [error]);

    console.log(error);

    if (isRouteErrorResponse(error) && error.status === 404) {
        console.log(error.status);

        return (
            <>
            <h1>Oops! 404</h1>
            <p>{error.data}</p>
            <Link to="/">Go home</Link>
            </>
        );
    }

    if (isRouteErrorResponse(error) && error.status === 401) {
        console.log(error.status);

        return (
            <>
            <h1>No access! 401</h1>
            <p>Did you remember to login? - Or maybe your token is expired</p>
            <p>Redirecting...</p>
            <Form action="/login">
                <button>Click to login now</button>
            </Form>
            </>
        );
    }
    
    return ( 
        <>
        <h1>OOPS!</h1>
        <p>Something went wrong! ...</p>
        </>
     );
}
 
export default Error;