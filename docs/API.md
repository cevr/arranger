While some of these hooks are not actually hooks, their purpose is to compose together with other hooks providing a seemless flow.

## TOC

-   [Hooks](#Hooks)
    -   [`lifecycle()`](#lifecycle)
    -   [`makeContext()`](#makeContext)
    -   [`makeEffect()`](#makeEffect)
    -   [`makeHandlers()`](#makeHandlers)
    -   [`makeHook()`](#makeHook)
    -   [`makeMemo()`](#makeMemo)
    -   [`makeProps()`](#makeProps)
    -   [`makeRef()`](#makeRef)
    -   [`makeState()`](#makeState)
    -   [`makeStateHandlers()`](#makeStateHandlers)
    -   [`makeReducer()`](#makeReducer)
-   [Utilities](#utilities)
    -   [`checkPropTypes()`](#checkPropTypes)
    -   [`compose()`](#compose)
    -   [`defaultProps()`](#defaultProps)
    -   [`flattenProp()`](#flattenProp)
    -   [`pipe()`](#pipe)
    -   [`renameProp()`](#renameProp)
    -   [`renameProps()`](#renameProps)

## Hooks

### `lifecycle()`

```js
lifecycle(
  getSpec: UnaryFn<{props, state, setState, prevProps, prevState}, Spec>
): HigherOrderComponent
```

A hook version of [`React.Component`](https://facebook.github.io/react/docs/react-api.html#react.component) common lifecycles. It supports only the `onMount`, `onUnmount`, `onUpdate`, and `shouldUpdate` lifecycles. Please note that these are _not_ the same synchronous methods that React calls. They are simulated for easier reasoning.

Any state changes made in a lifecycle method, by using `setState`, will be propagated to the wrapped component as props.

Example:

```js
const useEnhancer = lifecycle(({ setState, props }) => ({
    onMount() {
        fetchPosts(props.id).then(posts => {
            setState({ posts })
        })
    },
}))

function PostsList(props) {
    // posts will start undefined
    const { posts = [] } = useEnhancer(props)
    return (
        <ul>
            {posts.map(p => (
                <li>{p.title}</li>
            ))}
        </ul>
    )
}
```

Alternatively:

```js
const useEnhancer = pipe(
    lifecycle(({ props, setState }) => ({
        onMount() {
            fetchPosts(props.id).then(posts => {
                setState({ posts })
            })
        },
    })),
    // posts will be defaulted
    defaultProps({ posts: [] }),
)

function PostsList(props) {
    const { posts } = useEnhancer(props)
    return (
        <ul>
            {posts.map(p => (
                <li>{p.title}</li>
            ))}
        </ul>
    )
}
```

### `makeContext()`

```js
makeContext(
Context: React.Context, contextMapper: (contextValue) => any | string
):(props: Object) => {...props, ...contextMapper}
```

Provides context to the component. `Context` is a React.Context, and `contextMapper` provides the key or objectMap to be merged with the props.

### `makeEffect()`

```js
makeEffect(effect: props => void, deps: string[]): (props: Object) => {...props}
```

Like the useEffect hook, this allows you to handle effects inside the enhancer pipe. The `deps` are a list of keys that match the props you are depending on.

Example

```js
const useEnhancer = makeEffect(
    ({ setId, id }) => {
        setId(id)
    },
    ['setId', 'id'],
)
```

### `makeHandlers()`

```js
makeHandlers(
  handlers: {
    [handlerName: string]: (props: Object) => Function
  }
): (props: Object) => {...props, ...handlers}
```

Takes an object map of handler creators or a factory function. These are higher-order functions that accept a set of props and return a function handler:

This allows the handler to access the current props via closure, without needing to change its signature.

Handlers are merged into the enhanced props, whose identities are preserved across renders. This avoids a common pitfall where functional components create handlers inside the body of the function, which results in a new handler on every render and breaks downstream `shouldComponentUpdate()` optimizations that rely on prop equality.

Usage example:

```js
const useEnhancer = pipe(
    makeState('values', 'setValues', {}),
    makeHandlers({
        onChange: props => event => {
            props.setValues(values => ({
                ...values,
                [event.target.name]: event.target.value,
            }))
        },
        onSubmit: props => event => {
            event.preventDefault()
            submitForm(props.values)
        },
    }),
)

function Form(props) {
    const { value, onChange, onSubmit } = useEnhancer(props)
    return (
        <form onSubmit={onSubmit}>
            <label>
                Value
                <input
                    type="text"
                    name="email"
                    value={value}
                    onChange={onChange}
                />
            </label>
        </form>
    )
}
```

### `makeHook()`

```js
makeHook(
  hookMapper: (props) => mappedProps
): (props: Object) => {...mappedProps, ...props}
```

Specify a mapper function that can contain other hooks, then integrate the return of the hook into the props object.

Example:

```js
const useEnhancer = pipe(
    makeState('selection', 'setSelection', []),
    makeHook(props => {
        const users = useStore(state => state.users)
        return { users }
    }),
)

function Component(props) {
    const { selection, users } = useEnhancer(props)
    //...
}
```

### `makeMemo()`

```js
makeMemo(
  mapper: props => () => ({memoized: expensiveComputation()}),
  deps: string[]
): (props: Object) => {...props, ...mapper}
```

Wrapper over the `useMemo()` hook. Expects the mapper to return a function that returns a map of new props. Will only update if dependencies update.

Example:

```js
const useEnhancer = makeMemo(
    props => () => ({ totals: calculateTotals(props.items) }),
    ['items'],
)

function Component(props) {
    const { totals } = useEnhancer(props)
    //...
}
```

### `makeProps()`

```js
makeProps(
  createProps: (ownerProps: Object) => Object | Object
): (props: Object) => {...props, ...ownerProps}
```

Instead of a function, you can also pass a props object directly. In this form, it is similar to `defaultProps()`, except the provided props take precedence over props from the component.

### `makeRef()`

```js
makeRef(
  refName: string,
  initialValue: any | (props) => any
): (props: Object) => {...props, ...[refName]: ref}
```

Wrapper for the useRef hook.

### `makeState()`

```js
makeState(
  stateName: string,
  stateUpdaterName: string,
  initialState: any | (props: Object) => any
): (props: Object) => {...props, [stateName]: initalState, stateUpdaterName}
```

Passes two additional props to the base component: a state value, and a function to update that state value. The state updater has the following signature:

```js
stateUpdater<T>((prevValue: T) => T, ?callback: Function): void
stateUpdater(newValue: any, ?callback: Function): void
```

The first form accepts a function which maps the previous state value to a new state value. You'll likely want to use this state updater along with `makeHandlers()` to create specific updater functions. For example, to create a hook that adds basic counting functionality to a component:

```js
const useCounter = pipe(
    makeState('count', 'setCount', 0),
    makeHandlers({
        increment: ({ setCount }) => () => setCount(n => n + 1),
        decrement: ({ setCount }) => () => setCount(n => n - 1),
        reset: ({ setCount }) => () => setCount(0),
    }),
)
```

The second form accepts a single value, which is used as the new state.

Both forms accept an optional second parameter, a callback function that will be executed once `setState()` is completed and the component is re-rendered.

An initial state value is required. It can be either the state value itself, or a function that returns an initial state given the initial props.

### `makeStateHandlers()`

```js
makeStateHandlers(
  initialState: Object | (props: Object) => Object,
  stateHandlers: {
    [key: string]: (state:Object, props:Object) => (...payload: any[]) => Object
  }
): (props: Object) => { ...props, ...initialState, ...stateHandlers }

```

Returns state object properties and immutable updater functions
in a form of `(...payload: any[]) => Object`.

Every state updater function accepts state, props and payload and must return a new state or undefined. The new state is shallowly merged with the previous state.
Returning undefined does not cause a component rerender.

Example:

```js
const useCounter = withStateHandlers(
    ({ initialCounter = 0 }) => ({
        counter: initialCounter,
    }),
    {
        increment: ({ counter }) => value => ({
            counter: counter + value,
        }),
        decrement: ({ counter }) => value => ({
            counter: counter - value,
        }),
        resetCounter: (_, { initialCounter = 0 }) => () => ({
            counter: initialCounter,
        }),
    },
)
function Counter(props) {
    const { counter, increment, decrement, resetCounter } = useCounter(props)
    return (
        <div>
            <Button onClick={() => increment(2)}>Inc</Button>
            <Button onClick={() => decrement(3)}>Dec</Button>
            <Button onClick={resetCounter}>Reset</Button>
        </div>
    )
}
```

### `makeReducer()`

```js
makeReducer<S, A>(
  stateName: string,
  dispatchName: string,
  reducer: (state: S, action: A) => S,
  initialState: S | (ownerProps: Object) => S
): (props: Object) => {...props, [stateName]: initialState, dispatchName}
```

Similar to `makeState()`, but state updates are applied using a reducer function. A reducer is a function that receives a state and an action, and returns a new state.

Returns two additional props to the component: a state value, and a dispatch method. The dispatch method has the following signature:

```js
dispatch(action: Object, ?callback: Function): void
```

It sends an action to the reducer, after which the new state is applied. It also accepts an optional second parameter, a callback function with the new state as its only argument.

## Utilities

arranger also includes some additional helpers that aren't hooks.

### `checkPropTypes()`

```js
checkPropTypes(
  propTypes: React.PropTypes,
  componentName: string
): (props: Object) => {...props}
```

In many cases, the props being created by these hooks cannot be type checked with `Component.propTypes`. This allows for prop checking in these cases

Example:

```js
const useCounter = pipe(
    makeState('count', 'setCount', 0),
    makeHandlers({
        increment: ({ setCount }) => () => setCount(n => n + 1),
        decrement: ({ setCount }) => () => setCount(n => n - 1),
        reset: ({ setCount }) => () => setCount(0),
    }),
    checkPropTypes({
        counter: PropTypes.number,
        increment: PropTypes.func,
        decrement: PropTypes.func,
        reset: PropTypes.func,
    }),
)
```

### `compose()`

```js
compose(...functions: Array<Function>): Function
```

Use to compose multiple hooks into a single hook. This flows from left to right (or bottom up).

### `defaultProps()`

```js
defaultProps(
  defaultProps: Object
): (props: Object) => {...defaultProps, ...props}
```

Specifies props to be passed by default to the base component. Similar to `makeProps()`, except the props from the owner take precedence over props provided by the component.

Although it has a similar effect, using the `defaultProps()` hook is _not_ the same as setting the static `defaultProps` property directly on the component.

### `flattenProp()`

```js
flattenProp(
  propName: string
): HigherOrderComponent
```

Flattens a prop so that its fields are spread out into the props object.

```js
const useEnhancer = pipe(
    makeProps({
        object: { a: 'a', b: 'b' },
        c: 'c',
    }),
    flattenProp('object'),
)

function Component(props) {
    const { a, b, c, object } = useEnhancer(props)
    // ...
}
```

An example use case for `flattenProp()` is when receiving fragment data from Relay. Relay fragments are passed as an object of props, which you often want flattened out into its constituent fields:

```js
// The `post` prop is an object with title, author, and content fields
const useEnhancer = flattenProp('post')
function Post(props) {
    const { title, content, author } = useEnhancer(props)
    return (
        <article>
            <h1>{title}</h1>
            <h2>By {author.name}</h2>
            <div>{content}</div>
        </article>
    )
}
```

### `pipe()`

```js
pipe(...functions: Array<Function>): Function
```

Use to compose multiple hooks into a single hook. This flows from right to left (or top down).

### `renameProp()`

```js
renameProp(
  oldName: string,
  newName: string
): (props: Object) => {...props, [newName]: props[oldName], [oldName]: undefined}
```

Renames a single prop.

Example:

```js
const useEnhancer = pipe(
    makeProps({ loadingDataFromApi: true, posts: [] }),
    renameProp('loadingDataFromApi', 'isLoading'),
    renameProp('posts', 'items'),
)

function Posts(props) {
    const { isLoading, items } = useEnhancer(props)
    return (
        <div>
            <div>Loading: {isLoading ? 'yes' : 'no'}</div>
            <ul>
                {isLoading ||
                    items.map(({ id, title }) => <li key={id}>{title}</li>)}
            </ul>
        </div>
    )
}
```

### `renameProps()`

```js
renameProps(
  nameMap: { [key: string]: string }
): (props: Object) => {...props, ...nameMap}
```

Renames multiple props, using a map of old prop names to new prop names.

Example:

```js
const useEnhancer = pipe(
    makeProps({ loadingDataFromApi: true, posts: [] }),
    renameProps({ loadingDataFromApi: 'isLoading', posts: 'items' }),
)

function Posts(props) {
    const { isLoading, items } = useEnhancer(props)
    return (
        <div>
            <div>Loading: {isLoading ? 'yes' : 'no'}</div>
            <ul>
                {isLoading ||
                    items.map(({ id, title }) => <li key={id}>{title}</li>)}
            </ul>
        </div>
    )
}
```
