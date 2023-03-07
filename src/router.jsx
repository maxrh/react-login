import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    Route 
} from "react-router-dom";
import About, { loader as aboutLoader } from "./views/About";
import Statements, { 
    loader as statementsLoader, 
    action as statementsAction 
} from "./views/Statements";
import Secrets, { 
    secretsLoader, 
    secretsAction 
} from "./views/Secrets";
import Login from "./views/Login";
import Register from "./views/Register";
import App from "./App";
import Home from "./views/Home";
import RequireAuth from "./components/RequireAuth";
import Error from "./views/Error";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<Error />}>
            <Route path="/" element={<Home />} />
            <Route 
                path="about" 
                element={<About />} 
                loader={aboutLoader} 
            />
            <Route 
                path="statements" 
                element={<Statements />} 
                loader={statementsLoader} 
                action={statementsAction} 
            />
            <Route 
                path="login" 
                element={<Login />} 
            />
            <Route 
                path="register" 
                element={<Register />} 
            />
            <Route 
                path="secrets" 
                element={
                    <RequireAuth>
                        <Secrets />
                    </RequireAuth>
                } 
                loader={secretsLoader}
                action={secretsAction}
            />
        </Route>          
    )
);