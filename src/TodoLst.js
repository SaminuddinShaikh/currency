import React from 'react';
import { ACTIONS } from './App.js'

export default function TodoLst({ todos, id, dispatch2, }) {
    return (
        todos.map((todo) => {
            return (
                <div key={todo.id}>
                    <span style={{ color: todo.complete ? '#D3D3D3' : '#000000' }}>{todo.name}</span>
                    <button onClick={() => dispatch2({
                        type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id }
                    })}>Done</button>
                    <button onClick={() => dispatch2({
                        type: ACTIONS.DELETE_TODO, payload: { id: todo.id }
                    })}>Delete</button>
                </div>
            )
        })
    )
}
