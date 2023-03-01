import { useLoaderData, useActionData, Form, json, Link } from 'react-router-dom';

const Login = () => {

    return (
    
        <section>
    
            <Form method="post">

                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input 
                        type="email" 
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input 
                        type="text" 
                        name="password"
                    />
                </div>

                <button type="submit">Login</button>

                <Link to="/register">Register</Link>
               
            </Form>
    
        </section>
    
    );
}

export default Login;