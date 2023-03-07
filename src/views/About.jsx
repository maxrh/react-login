import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return await response.json();
};

const About = () => {
    
    const todos = useLoaderData();

    return (
    
        <section>
        
            <h1>About</h1>

            {todos.map((todo) => (
                <div key={todo.id}>
                    <p>{todo.title} - {todo.completed ? 'Completed' : 'Not completed'}</p>
                </div>
            ))}
    
        </section>
    
    )
};

export default About;