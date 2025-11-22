/** @jsx Villax.createElement */

// ============================================
// VILLAX CORE
// ============================================

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === 'object'
                    ? child
                    : createTextElement(child)
            )
        }
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createDom(fiber) {
    const dom =
        fiber.type === "TEXT_ELEMENT"
            ? document.createTextNode(fiber.props.nodeValue || "")
            : document.createElement(fiber.type)

    updateDom(dom, {}, fiber.props)
    return dom
}

const isEvent = key => key.startsWith("on")
const isProperty = key => key !== "children" && !isEvent(key)
const isGone = (prev, next) => key => !(key in next)
const isNew = (prev, next) => key => prev[key] !== next[key]

function updateDom(dom, prevProps, nextProps) {
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(
            key =>
                !(key in nextProps) ||
                isNew(prevProps, nextProps)(key)
        )
        .forEach(name => {
            const eventType = name
                .toLowerCase()
                .substring(2)
            dom.removeEventListener(
                eventType,
                prevProps[name]
            )
        })

    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = ""
        })

    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            if (name === "style" && typeof nextProps.style === "string") {
                dom.setAttribute("style", nextProps.style)
            } else if (name !== "nodeValue") {
                dom[name] = nextProps[name]
            }
        })

    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name
                .toLowerCase()
                .substring(2)
            dom.addEventListener(
                eventType,
                nextProps[name]
            )
        })
}

function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }

    let domParentFiber = fiber.parent
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom

    if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, domParent)
    } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
        updateDom(
            fiber.dom,
            fiber.alternate.props,
            fiber.props
        )
    }

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    }

    deletions = []
    nextUnitOfWork = wipRoot
}

let currentRoot = null
let nextUnitOfWork = null
let wipRoot = null
let deletions = []

function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }

    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function

    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }

    if (fiber.child) {
        return fiber.child
    }

    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
}

let wipFiber = null
let hookIndex = null

function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}

function useState(initial) {
    const oldHook =
        wipFiber.alternate &&
        wipFiber.alternate.hooks &&
        wipFiber.alternate.hooks[hookIndex]

    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    }

    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => {
        hook.state = action(hook.state)
    })

    const setState = action => {
        hook.queue.push(action)
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
        }
        nextUnitOfWork = wipRoot
        deletions = []
    }

    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
}

function reconcileChildren(wipFiber, elements) {
    let index = 0
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child
    let prevSibling = null

    while (index < elements.length || oldFiber != null) {
        const element = elements[index]
        let newFiber = null

        const sameType = oldFiber && element && element.type === oldFiber.type

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE"
            }
        }

        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: "PLACEMENT"
            }
        }

        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION"
            deletions.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if (index === 0) {
            wipFiber.child = newFiber
        } else if (element) {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }
}

const Villax = {
    createElement,
    render,
    useState
}

// ============================================
// APP EXAMPLE
// ============================================

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
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ JSX Support</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ Virtual DOM</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ Fiber Architecture</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ Reconciliation Algorithm</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ Function Components</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ Hooks (useState)</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ Event Handlers</li>
                <li style="padding: 10px; margin: 5px 0; background: #f5f5f5; border-radius: 5px;">✅ Concurrent Mode</li>
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

// ============================================
// RENDER
// ============================================

const container = document.getElementById("root")
Villax.render(<App />, container)
