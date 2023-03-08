import { useLoaderData, useActionData, Form } from "react-router-dom";
import axios from "axios";
import * as z from "zod";
import { createErrorsObject } from "../helpers/errorhandling";

export const secretsLoader = (user) => async () => {
    try {
        let response = await axios('http://localhost:4000/secrets', { 
            headers: { 
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return await response.data;
    } catch (error) {
        throw new Response("no user", { status: 401 });
    }
};

export const secretsAction = (user) => async ({ request }) => {
    let formData = await request.formData();
    let values = Object.fromEntries( await formData );

    let schema = z.object({
        quote: z.string().min(3, { message: "Quote must be at least 3 characters long!" }),
        author: z.string().min(3, { message: "Author must be at least 3 characters long!" }),
        origin: z.string().optional(),
    });

    let { success, data, error } = schema.safeParse(values);

    if ( success ) {
        await axios.post("http://localhost:4000/secrets", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        return null;
    } else { 
        return createErrorsObject(error);
    }
};

const Secrets = () => {
    const secrets = useLoaderData();
    const errors = useActionData();

    return ( 
        <section>
        
            <h1>Secrets</h1>

            {secrets.map((secret) => (
                <div key={secret.id}>
                    <p>{secret.quote} - <em>{secret.author}</em></p>
                </div>
            ))}

            <Form method="post">

                <h2>Add a new secret</h2>
                <div className="form-group">
                    <label htmlFor="quote">Quote</label>
                    <input type="text" name="quote" id="quote"/>
                    {errors?.quote && <p>{errors.quote}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author"/>
                    {errors?.author && <p>{errors.author}</p>}

                </div>
                <div className="form-group">
                    <label htmlFor="origin">Origin</label>
                    <input type="text" name="origin" id="origin"/>
                    {errors?.origin && <p>{errors.origin}</p>}
                </div>

                <button type="submit">Add</button>

            </Form>
    
        </section>
     );
}
 
export default Secrets;