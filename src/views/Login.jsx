import { Form, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { createErrorsObject } from '../helpers/errorhandling';
import axios from 'axios';
import * as z from 'zod';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const from = location.state?.from?.pathname || "/";

    const schema = z
        .object({
            email: z.string().email(),
            password: z.string().min(4)
        })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        let validated = schema.safeParse(values)

        if (validated.success) {
            try {
                let response = await axios.post("http://localhost:4000/login", { 
                    email: validated.data.email,
                    password: validated.data.password
                });
                auth.signin(response.data, () => navigate(from));
            } catch (error) {
                setErrors({ status: error.response.data });
            }
        } else {
            setErrors(createErrorsObject(validated.error));
        }

    };

    return (
    
        <section>
    
            <Form method="post" onSubmit={handleSubmit}>

                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input 
                        type="email" 
                        name="email"
                    />
                    {errors?.email && <p>{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" />
                    {errors?.password && <p>{errors.password}</p>}
                </div>

                {errors?.status && <p>{errors.status}</p>}

                <button type="submit">Login</button>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
               
            </Form>
    
        </section>
    
    );
}

export default Login;