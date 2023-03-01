import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    Route 
} from "react-router-dom";
import About, { loader as aboutLoader } from "./views/About";
import Statements, { loader as statementsLoader, action as statementsAction } from "./views/Statements";
import Login from "./views/Login";
import Register from "./views/Register";
import App from "./App";
import Home from "./views/Home";
import RequireAuth from "./components/RequireAuth";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route 
                path="about" 
                element={
                    <RequireAuth>
                        <About />
                    </RequireAuth>
                } 
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
                loader={statementsLoader} 
            />
            <Route 
                path="register" 
                element={<Register />} 
                loader={statementsLoader} 
            />
        </Route>          
    )
);