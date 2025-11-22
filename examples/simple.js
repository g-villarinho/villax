/** @jsx Villax.createElement */
import Villax from '../src/villax.js'

function SimpleExample() {
    return (
        <div style="padding: 40px; max-width: 600px; margin: 0 auto; text-align: center;">
            <h1 style="color: #667eea; font-size: 48px;">
                🚀 Hello Villax!
            </h1>
            <p style="font-size: 20px; color: #666;">
                This is a simple example without hooks.
            </p>
            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                <p>✨ JSX is working!</p>
                <p>🎨 Styling is applied!</p>
                <p>⚡ Virtual DOM is rendering!</p>
            </div>
        </div>
    )
}

export default SimpleExample
