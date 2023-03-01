import { Outlet, Link, useNavigation } from 'react-router-dom'
import './App.css'

function App() {

    const navigation = useNavigation();

    return (
        <div className="App">
            
            <header>
                <h1>React Router</h1>
                <nav>
                    <Link to="/">Home</Link>{" "}
                    <Link to="about">About</Link>{" "}
                    <Link to="statements">Statements</Link>{" "}
                    <Link to="login">Login</Link>
                </nav>
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

export default App
