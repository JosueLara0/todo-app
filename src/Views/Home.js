// Libraries
import React, {useReducer, useState, useEffect} from 'react';

// Components
import TodoItem from '../Components/Home/TodoItem';
import AddTodo from '../Components/Home/AddTodo';
import TodoList from "../Components/Home/TodoList";

// Actions used in the reducer dispatch
export const ACTIONS = {
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo",
    DELETE_TODO: "delete-todo",
    GET_ITEM: "get-item"
};

// Handle the ACTIONS buttons
const reducer = (todos, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)];
        case ACTIONS.TOGGLE_TODO:
            return todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return {...todo, complete: !todo.complete};
                }
                return todo;
            });
        case ACTIONS.DELETE_TODO:
            return todos.filter(todo => todo.id !== action.payload.id);
        case ACTIONS.GET_ITEM:
            return JSON.parse(localStorage.getItem("todoList"));
        default:
            return todos;
    }
};

// Give format to every new todo added
const newTodo = (name) => {
    return {id: Date.now(), name: name, complete: true};
};

const Home = () => {
    const [todos, dispatch] = useReducer(reducer, []);
    const [todosDeleted, setTodosDeleted] = useState([]);
    const [status, setStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);

    // Get the todoList from localStorage
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todoList"))) {
            dispatch({type: ACTIONS.GET_ITEM});
        }
    }, []);

    // Create and Update todoList localStorage
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todos));
    }, [todos]);

    // Get the todoDeletedList from localStorage
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todoDeletedList"))) {
            setTodosDeleted(JSON.parse(localStorage.getItem("todoDeletedList")));
        }
    }, []);

    // Create and Update todoDeletedList localStorage
    useEffect(() => {
        localStorage.setItem("todoDeletedList", JSON.stringify(todosDeleted));
    }, [todosDeleted]);

    // Control the type of todos viewed
    useEffect(() => {
        const filterHandler = () => {
            switch (status) {
                case 'completed':
                    setFilteredTodos(todos.filter(todo => todo.complete === false));
                    break;
                case 'uncompleted':
                    setFilteredTodos(todos.filter(todo => todo.complete === true));
                    break;
                case 'all':
                    setFilteredTodos(todos);
                    break;
                case 'deleted':
                    setFilteredTodos(todosDeleted);
                    break;
                default:
                    setFilteredTodos(todos);
                    break;
            }
        };
        filterHandler();
    }, [status, todos, todosDeleted]);

    // Set status for filterHandler function
    const statusHandler = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-main_blue">
            <div className="w-11/12 md:w-7/12 h-5/6 overflow-auto bg-blue3 border-2 border-yellow rounded ">
                <div className="bg-blue1 text-white">
                    <h2 className="text-center text-3xl pt-5">TODO App</h2>
                    <AddTodo todos={todos} dispatch={dispatch}/>
                </div>
                <TodoList statusHandler={statusHandler}>
                    {filteredTodos?.length > 0 && filteredTodos.map(todo => {
                        return <TodoItem key={todo.id} todo={todo} dispatch={dispatch} status={status}
                                         todosDeleted={todosDeleted} setTodosDeleted={setTodosDeleted}
                        />;
                    })}
                </TodoList>
            </div>
        </div>
    );
};

export default Home;