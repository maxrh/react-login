import { useLoaderData, useActionData, Form } from 'react-router-dom';
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

    if ( values._action === "delete" ) {
        await axios.delete("http://localhost:4000/statements/" + values._id);
        return null;
    } else {
        let schema = z.object({
            sentence: z
                .string({ required_error: "Sentence is required!" })
                .min(3, { message: "Sentence must be at least 3 characters long!" }),
        });

        let { success, data, error } = schema.safeParse(values);

        if ( success ) {
            await axios.post("http://localhost:4000/statements", data);
            return null;
        } else {
            return createErrorsObject(error);
        }
    }
};

const Statements = () => {
    
    const statements = useLoaderData();
    const errors = useActionData();

    const handleConfirmation = (e) => {
        if ( !confirm("Are you sure you want to delete this statement?") ) {
            e.preventDefault();
        } else {
            return true;
        }
    };

    return (
    
        <section>
        
            <h1>Statements</h1>

            {statements.map((statement) => (
                <div key={statement.id} style={{ display: "flex", justifyContent: "center", gap: "1rem"}}>
                    <p>{statement.sentence}</p>
                    <Form method="post" onSubmit={handleConfirmation}>
                        <input type="hidden" name="_action" value="delete"/>
                        <input type="hidden" name="_id" value={statement.id}/>

                        <button>&times;</button>
                    </Form>
                </div>
            ))}

            <Form method="post">

                <h2>Add a new statement</h2>
                <div className="form-group">
                    <input type="text" name="sentence"/>
                    {errors?.sentence && <p>{errors.sentence}</p>}
                </div>
                <button type="submit">Add</button>

            </Form>
    
        </section>
    
    )
};

export default Statements;