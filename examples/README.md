# Exemplos Villax

Esta pasta contém exemplos demonstrando diferentes recursos do Villax.

## 📝 Exemplos Disponíveis

### 1. Simple (`simple.js`)
Exemplo básico sem hooks, apenas JSX e renderização.

```jsx
import SimpleExample from './examples/simple.js'
Villax.render(<SimpleExample />, container)
```

### 2. Counter (`counter.js`)
Demonstra `useState` com múltiplos estados e event handlers.

**Features:**
- ✅ useState hook
- ✅ Event handlers (onclick, oninput)
- ✅ State updates
- ✅ Controlled inputs

```jsx
import App from './examples/counter.js'
Villax.render(<App />, container)
```

### 3. Todo App (`todo.js`)
Todo app completo com lista dinâmica.

**Features:**
- ✅ Complex state management
- ✅ Array manipulation
- ✅ Conditional rendering
- ✅ Component composition
- ✅ Event handling

```jsx
import TodoApp from './examples/todo.js'
Villax.render(<TodoApp />, container)
```

## 🔄 Como Trocar de Exemplo

Edite `src/index.js`:

```jsx
/** @jsx Villax.createElement */
import Villax from './src/villax.js'

// Escolha um exemplo:
// import App from './examples/simple.js'
import App from './examples/counter.js'
// import App from './examples/todo.js'

const container = document.getElementById("root")
Villax.render(<App />, container)
```

Depois compile:
```bash
npm run build
```

## 🎨 Criando Seu Próprio Exemplo

1. Crie um arquivo em `examples/`:

```jsx
/** @jsx Villax.createElement */
import Villax from '../src/villax.js'

function MyExample() {
    const [state, setState] = Villax.useState('initial')
    
    return (
        <div>
            <h1>My Example</h1>
            <p>{state}</p>
        </div>
    )
}

export default MyExample
```

2. Importe em `src/index.js`
3. Compile e teste!

## 💡 Dicas

- Use `console.log` para debug
- Inspecione no DevTools
- Experimente quebrar o código para entender como funciona
- Compare com React real
