import { useEffect } from 'react';
import { 
    Route,
    matchRoutes,
    RouterProvider, 
    createBrowserRouter, 
    createRoutesFromElements,
    useLocation,
    useNavigationType,
} from 'react-router-dom';
import Home from "./views/Home";
import About, { 
    loader as aboutLoader 
} from "./views/About";
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
import Profile, { 
    profileLoader, 
    profileAction 
} from "./views/Profile";
import Error from "./views/Error";
import RequireAuth from "./components/RequireAuth";
import useAuth from './hooks/useAuth';
import Layout from './components/Layout';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY,
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV6Instrumentation(
                useEffect,
                useLocation,
                useNavigationType,
                createRoutesFromElements,
                matchRoutes,
            ),
        }),
    ],
    tracesSampleRate: 1.0,
});

function App() {
    const { user } = useAuth();
    const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(
        createBrowserRouter
    );
      
    const router = sentryCreateBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />} errorElement={<Error />}>
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
                    loader={secretsLoader(user)}
                    action={secretsAction(user)}
                />
                <Route 
                    path="profile" 
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    } 
                    loader={profileLoader(user)}
                    action={profileAction(user)}
                />
            </Route>          
        )
    );

    return <RouterProvider router={router} />
}

export default App
