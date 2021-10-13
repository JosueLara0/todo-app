// Libraries
import React, {useState} from 'react';

// Actions used in the reducer dispatch
import {ACTIONS} from '../../Views/Home';

const AddTodo = ({todos, dispatch}) => {
    const [name, setName] = useState("");

    const handleAddTodo = () => {
        const duplicateTask = todos.filter(todo => todo.name === name);
        if (duplicateTask.length > 0) {
            alert('You already have this task');
            setName("");
        } else if (name === '') {
            alert('You need to write a task');
        } else {
            dispatch({type: ACTIONS.ADD_TODO, payload: {name: name}});
            setName("");
        }
    };

    return (
        <div className="flex justify-center py-5">
            <form onSubmit={handleAddTodo}>
                <input type="text" value={name} placeholder='Enter your task'
                       className="h-10 w-64 text-black focus:outline-none focus:ring-2 focus:ring-yellow"
                       onChange={e => setName(e.target.value)}/>
            </form>
            <button onClick={handleAddTodo} className="bg-yellow w-2/12  hover:text-black">
                Add +
            </button>
        </div>
    );
};

export default AddTodo;

