/** @jsx Villax.createElement */
import Villax from '../src/villax.js'

function Counter() {
    const [count, setCount] = Villax.useState(0)
    const [name, setName] = Villax.useState("Villax")

    return (
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; font-family: Arial; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h1>Hello from {name}! 🚀</h1>
            <h2 style="font-size: 48px; margin: 20px 0;">Count: {count}</h2>

            <div style="margin: 20px 0;">
                <button onclick={() => setCount(c => c + 1)}>
                    ➕ Increment
                </button>
                <button onclick={() => setCount(c => c - 1)}>
                    ➖ Decrement
                </button>
                <button onclick={() => setCount(0)}>
                    🔄 Reset
                </button>
            </div>

            <div style="margin-top: 30px;">
                <label style="display: block; margin-bottom: 10px; font-size: 18px;">
                    Your name:
                </label>
                <input
                    type="text"
                    value={name}
                    oninput={(e) => setName(e.target.value)}
                    placeholder="Type your name..."
                    style="padding: 10px; font-size: 16px; border-radius: 5px; border: none; width: 300px;"
                />
            </div>
        </div>
    )
}

function FeatureList() {
    return (
        <section style="padding: 20px; max-width: 600px; margin: 0 auto;">
            <h3 style="color: #667eea; font-size: 24px;">Villax Features:</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> JSX Support</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> Virtual DOM</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> Fiber Architecture</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> Reconciliation Algorithm</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> Function Components</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> Hooks (useState)</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> Event Handlers</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;"> Concurrent Mode</li>
            </ul>

            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 10px; border-left: 4px solid #ffc107;">
                <h4 style="margin-top: 0; color: #856404;">📚 Educational Project</h4>
                <p style="margin: 0; color: #856404; line-height: 1.6;">
                    This is a didactic implementation of React built from scratch to understand
                    how React works internally. Based on the tutorial "Build Your Own React" by Rodrigo Pomber.
                </p>
            </div>
        </section>
    )
}

function App() {
    return (
        <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
            <Counter />
            <FeatureList />
        </div>
    )
}

export default App
