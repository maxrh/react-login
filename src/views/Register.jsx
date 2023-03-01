import { Form } from 'react-router-dom';
import { useState } from 'react';
import { createErrorsObject } from '../helpers/errorhandling';
import axios from 'axios';
import * as z from 'zod';

const Register = () => {

    const [errors, setErrors] = useState(null);

    const schema = z
        .object({
            email: z.string().email(),
            password: z.string().min(4),
            confirmPassword: z.string().min(4)
        })
        .refine((values) => values.password === values.confirmPassword, {
            message: "Passwords do not match!",
            path: ["confirmPassword"]
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);
        console.log(values, "values");

        let validated = schema.safeParse(values)
        console.log(validated, "validated");

        if (validated.success) {
            let response = await axios.post("http://localhost:4000/register", { 
                email: validated.data.email,
                password: validated.data.password
            });

            console.log(response.data);
           
        } else {
            setErrors(createErrorsObject(validated.error));
        }


        // try {
        //     let validatedValues = schema.safeParse(values);
        //     let response = await axios.post("http://localhost:4000/register", { 
        //         validatedValues,
        //     });

        //     console.log(response.data, "response.data");

        // } catch (error) {
        //     let errors = createErrorsObject(json({ error }));
        //     console.log(errors);
        // }

    };

    return (
    
        <section>
    
            <Form method="post" onSubmit={handleSubmit}>

                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input 
                        id="email"
                        type="email" 
                        name="email"
                    />
                    {errors?.email && <p>{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input 
                        id="password"
                        type="password" 
                        name="password"
                    />
                    {errors?.password && <p>{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password </label>
                    <input 
                        id="confirmPassword"
                        type="password" 
                        name="confirmPassword"
                    />
                    {errors?.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>

                <button type="submit">Create account</button>
               
            </Form>
    
        </section>
    
    );
}

export default Register;