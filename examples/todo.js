/** @jsx Villax.createElement */
import Villax from '../src/villax.js'

function TodoItem({ text, completed, onToggle }) {
    return (
        <li
            style={`
                padding: 15px;
                margin: 5px 0;
                background: ${completed ? '#d4edda' : 'white'};
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
                border-left: 4px solid ${completed ? '#28a745' : '#667eea'};
                text-decoration: ${completed ? 'line-through' : 'none'};
            `}
            onclick={onToggle}
        >
            {completed ? '✅' : '⭕'} {text}
        </li>
    )
}

function TodoApp() {
    const [todos, setTodos] = Villax.useState([
        { id: 1, text: 'Learn Villax', completed: true },
        { id: 2, text: 'Build something cool', completed: false },
        { id: 3, text: 'Share with friends', completed: false }
    ])
    const [newTodo, setNewTodo] = Villax.useState('')

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos(todos => [
                ...todos,
                { id: Date.now(), text: newTodo, completed: false }
            ])
            setNewTodo('')
        }
    }

    const toggleTodo = (id) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        )
    }

    const completedCount = todos.filter(t => t.completed).length

    return (
        <div style="max-width: 600px; margin: 50px auto; padding: 30px; background: white; border-radius: 15px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            <h1 style="color: #667eea; text-align: center; margin-bottom: 30px;">
                📝 Todo App with Villax
            </h1>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input
                    type="text"
                    value={newTodo}
                    oninput={(e) => setNewTodo(e.target.value)}
                    onkeypress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="What needs to be done?"
                    style="flex: 1; padding: 12px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px;"
                />
                <button
                    onclick={addTodo}
                    style="background: #667eea; padding: 12px 24px;"
                >
                    ➕ Add
                </button>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <strong>{completedCount}</strong> of <strong>{todos.length}</strong> completed
            </div>

            <ul style="list-style: none; padding: 0; margin: 0;">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        onToggle={() => toggleTodo(todo.id)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TodoApp
