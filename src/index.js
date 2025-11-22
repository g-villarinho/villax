/** @jsx Villax.createElement */

import Villax from './villax.js'

function Counter() {
    const [count, setCount] = Villax.useState(0)
    const [name, setName] = Villax.useState("Villax")

    return (
        <div>
            <h1>Hello from {name}! 🚀</h1>
            <h2>Count: {count}</h2>
            <button onclick={() => setCount(c => c + 1)}>Increment</button>
            <button onclick={() => setCount(c => c - 1)}>Decrement</button>
            <button onclick={() => setCount(0)}>Reset</button>
            <br />
            <br />
            <input
                type="text"
                value={name}
                oninput={(e) => setName(e.target.value)}
                placeholder="Type your name..."
            />
        </div>
    )
}

function App() {
    return (
        <div>
            <Counter />
            <section style="padding: 20px;">
                <h3>Villax Features:</h3>
                <ul>
                    <li>✅ JSX Support</li>
                    <li>✅ Virtual DOM</li>
                    <li>✅ Fiber Architecture</li>
                    <li>✅ Reconciliation</li>
                    <li>✅ Function Components</li>
                    <li>✅ Hooks (useState)</li>
                    <li>✅ Event Handlers</li>
                </ul>
            </section>
        </div>
    )
}

const container = document.getElementById("root")
Villax.render(<App />, container)
