import { useLoaderData, useActionData, Form, json } from 'react-router-dom';
import { createErrorsObject } from '../helpers/errorhandling';
import axios from 'axios';
import * as z from 'zod';

export const loader = async () => {
    let response = await fetch('http://localhost:4000/statements');
    return await response.json();
};

export const action = async ({ request }) => {
    let formData = await request.formData();
    let values = Object.fromEntries( await formData );

    let schema = z.object({
        sentence: z
            .string({ required_error: "Sentence is required!" })
            .min(3, { message: "Sentence must be at least 3 characters long!" }),
    });

    let { succes, data, error } = schema.safeParse(values);

    if ( succes ) {
        await axios.post("http://localhost:4000/statements", data);
        return null;
    } else {
        return createErrorsObject(error);
    }
        
};

const Statements = () => {
    
    const statements = useLoaderData();
    const errors = useActionData();

    return (
    
        <section>
        
            <h1>Statements</h1>

            {statements.map((statement) => (
                <div key={statement.id}>
                    <h2>{statement.sentence}</h2>
                </div>
            ))}

            <Form method="post">

                <h2>Add a new statement</h2>
                <div className="form-group">
                    <label htmlFor="sentence">Sentence </label>
                    <input 
                        type="text" 
                        name="sentence"
                    />
                    {errors?.sentence && <p>{errors.sentence}</p>}
                </div>

                <button type="submit">Add</button>
               
            </Form>
    
        </section>
    
    )
};

export default Statements;