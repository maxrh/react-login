import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Cookies from "js-cookie";

export const secretsLoader = async () => {
    const user = JSON.parse(Cookies.get("auth"));
    console.log(user);
    let response = await axios('http://localhost:4000/secrets', { 
        headers: { 
            Authorization: `Bearer ${user.accessToken}`,
        },
    });
    return await response.data;
};


const Secrets = () => {
    const secrets = useLoaderData();


    console.log(secrets);


    return ( 
        <>
            <h1>Secrets:</h1>
        </>
     );
}
 
export default Secrets;