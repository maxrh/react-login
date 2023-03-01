import { Outlet, useNavigation } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import AuthStatus from './components/AuthStatus';
import Navigation from './components/Navigation';
import './App.css';

function App() {

    const navigation = useNavigation();

    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}

export default App
