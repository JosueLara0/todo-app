const TodoList = ({ children, statusHandler }) => {
  return (
    <>
      <div className="flex justify-between text-white bg-blue2 p-3">
        <button
          className="hover:text-yellow"
          onClick={statusHandler}
          value="all"
        >
          All
        </button>
        <button
          className="hover:text-yellow"
          onClick={statusHandler}
          value="uncompleted"
        >
          Uncompleted
        </button>
        <button
          className="hover:text-yellow"
          onClick={statusHandler}
          value="completed"
        >
          Completed
        </button>
        <button
          className="hover:text-yellow"
          onClick={statusHandler}
          value="deleted"
        >
          Deleted
        </button>
      </div>
      {children}
    </>
  );
};

export default TodoList;
