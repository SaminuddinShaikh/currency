import { useReducer, useState } from "react";
import TodoLst from "./TodoLst";

export const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  ADD_TODO: 'addTodo',
  TOGGLE_TODO: 'toggleTodo',
  DELETE_TODO: "deleteTodo"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 }
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 }
    default:
      return state
  }
}

function reducer2(toDos, action2) {
  switch (action2.type) {
    case ACTIONS.ADD_TODO:
      return [...toDos, newTodo(action2.payload.inputBoxValue)]
    case ACTIONS.TOGGLE_TODO:
      return (
        toDos.map(todo => {
          if (todo.id == action2.payload.id) {
            return {
              ...todo, complete: !todo.complete
            }
          }
          return todo
        })
      )
    case ACTIONS.DELETE_TODO:
      return toDos.filter(todo => todo.id !== action2.payload.id)
    default:
      return toDos
  }
}

function newTodo(value) {
  return { id: Date.now(), name: value, complete: false }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [todos, dispatch2] = useReducer(reducer2, []);
  const [inputValue, setInputValue] = useState("");

  function decrement() {
    dispatch({ type: ACTIONS.DECREMENT })
  }
  function increment() {
    dispatch({ type: ACTIONS.INCREMENT })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch2({ type: ACTIONS.ADD_TODO, payload: { inputBoxValue: inputValue } })
    setInputValue('');

  }


  return (
    <>
      <button onClick={decrement}>-</button>
      <h1>{state.count}</h1>
      <button onClick={increment}>+</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </form>
      <TodoLst
        todos={todos}
        dispatch2={dispatch2}
      />
    </>
  );
}

export default App;
