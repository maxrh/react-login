import { Outlet, useNavigation } from 'react-router-dom';
import AuthStatus from './AuthStatus';
import Navigation from './Navigation';
import '../App.css';

const Layout = () => {
    const navigation = useNavigation();

    return (
        <div className="App">
            <header>
                <h1>React Router</h1>
                <AuthStatus />
                <Navigation />
            </header>
            <main>
                {navigation.state === "loading" ? <p>Loading...</p> : <Outlet/> }
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    )
}

export default Layout
