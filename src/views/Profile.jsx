import { useActionData, Form } from "react-router-dom";
import axios from "axios";
import * as z from "zod";
import { createErrorsObject } from "../helpers/errorhandling"; 
import useAuth from "../hooks/useAuth";

export const profileAction = (user, updateUser) => async ({ request }) => {
    let formData = await request.formData();
    let values = Object.fromEntries( await formData );

    let schema = z.object({
        email: z.string().email("Invalid email address!"),
        username: z.string().min(1, { message: "Username is required!" }),
        name: z.string().optional(),
        bday: z.coerce.date({ invalid_type_error: "Birthday must be a valid date!" }),
        desc: z.string().optional(),
    });

    let { success, data, error } = schema.safeParse(values);

    if ( success ) {
        let response = await axios.patch("http://localhost:4000/users/" + user.id, data, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        updateUser(await response.data);
        return null;
    } else { 
        return createErrorsObject(error);
    }
};

const Profile = () => {
    const { user } = useAuth();
    const errors = useActionData();
    
    return ( 
        <section>
            <h1>Profile</h1>

            <Form method="post">

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}/>
                    {errors?.email && <p>{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" defaultValue={user.username}/>
                    {errors?.username && <p>{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="fname">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.name} />
                    {errors?.name && <p>{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="bday">Birthday</label>
                    <input type="date" name="bday" id="bday" defaultValue={user.bday ? user.bday.split("T")[0] : ""} />
                    {errors?.bday && <p>{errors.bday}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc" id="desc" defaultValue={user.desc}></textarea>
                    {errors?.desc && <p>{errors.desc}</p>}
                </div>

                <button type="submit">Update profile</button>

            </Form>
        </section>
    );
}
 
export default Profile;