// assets
import deleteButton from "../../assets/deleteButton.svg";
import arrowUndoButton from "../../assets/arrowUndoButton.svg";
import checkboxButton from "../../assets/checkboxButton.svg";

// Actions used in the reducer dispatch
import { ACTIONS } from "../../Views/Home";

const TodoItem = ({
  todo,
  dispatch,
  todosDeleted,
  setTodosDeleted,
  status,
}) => {
  const handleRecycleTodos = () => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: todo.name } });
    setTodosDeleted(
      todosDeleted.filter((todoDeleted) => todoDeleted.id !== todo.id)
    );
  };

  const handleDeletedTodos = () => {
    if (status === "deleted") {
      setTodosDeleted(
        todosDeleted.filter((todoDeleted) => todoDeleted.id !== todo.id)
      );
    } else if (todo.complete) {
      alert("you need to complete the task first");
    } else {
      setTodosDeleted([...todosDeleted, todo]);
      dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } });
    }
  };

  return (
    <div className="flex justify-between w-full mt-4 border-b-2 border-blue2 p-2 text-black">
      <div className="flex overflow-auto">
        {status === "deleted" ? (
          <button onClick={handleRecycleTodos}>
            <img
              className="h-10 opacity-40 hover:opacity-100"
              src={arrowUndoButton}
              alt="Toggle"
            />
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
            }
          >
            <img
              className={`${
                todo.complete ? "opacity-40" : "opacity-100"
              } h-10 hover:opacity-100`}
              src={checkboxButton}
              alt=""
            />
          </button>
        )}
        <p
          className={`${
            !todo.complete ? "line-through text-black " : "Recycle"
          } p-3`}
        >
          {todo.name}
        </p>
      </div>
      <button onClick={handleDeletedTodos}>
        <img
          className="h-10 opacity-40 hover:opacity-100"
          src={deleteButton}
          alt="Delete"
        />
      </button>
    </div>
  );
};

export default TodoItem;
