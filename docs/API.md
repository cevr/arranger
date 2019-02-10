While some of these hooks are not actually hooks, their purpose is to compose together with other hooks providing a seemless flow.

## TOC

-   [Hooks](#Hooks)
    -   [`usePropsMapper()`](#usePropsMapper)
    -   [`useProps()`](#useProps)
    -   [`usePropsOnChange()`](#withpropsonchange)
    -   [`useHandlers()`](#useHandlers)
    -   [`useDefaultProps()`](#useDefaultProps)
    -   [`usePropRenamer()`](#usePropRenamer)
    -   [`usePropsRenamer()`](#usePropsRenamer)
    -   [`usePropFlattener()`](#usePropFlattener)
    -   [`useStateEnhancer()`](#useStateEnhancer)
    -   [`useStateHandlers()`](#useStateEnhancerhandlers)
    -   [`useReducerEnhancer()`](#withreducer)
    -   [`useContextEnhancer()`](#withcontext)
    -   [`useLifecycle()`](#useLifecycle)
    -   [`usePropTypes()`](#usePropTypes)
-   [Utilities](#utilities)
    -   [`compose()`](#compose)
    -   [`pipe()`](#pipe)

## Hooks

### `usePropsMapper()`

```js
usePropsMapper(
  propsMapper: (ownerProps: Object) => Object,
): (props: Object) => ownerProps
```

Accepts a function that maps owner props to a new collection of props that are returned.

### `useProps()`

```js
useProps(
  createProps: (ownerProps: Object) => Object | Object
): (props: Object) => {...props, ...ownerProps}
```

Like `usePropsMapper()`, except the newly created props are merged with the owner props.

Instead of a function, you can also pass a props object directly. In this form, it is similar to `useDefaultProps()`, except the provided props take precedence over props from the owner.

### `usePropsOnChange()`

```js
withPropsOnChange(
  shouldMapOrKeys: Array<string> | (props: Object, nextProps: Object) => boolean,
  createProps: (ownerProps: Object) => Object
): (props: Object) => {...props, ...ownerProps}
```

Like `useProps()`, except the new props are only created when one of the owner props specified by `shouldMapOrKeys` changes. This helps ensure that expensive computations inside `createProps()` are only executed when necessary.

Instead of an array of prop keys, the first parameter can also be a function that returns a boolean, given the current props and the next props. This allows you to customize when `createProps()` should be called.

### `useHandlers()`

```js
useHandlers(
  handlerCreators: {
    [handlerName: string]: (props: Object) => Function
  } |
  handlerCreatorsFactory: (initialProps) => {
    [handlerName: string]: (props: Object) => Function
  }
): (props: Object) => {...props, ...handlers}
```

Takes an object map of handler creators or a factory function. These are higher-order functions that accept a set of props and return a function handler:

This allows the handler to access the current props via closure, without needing to change its signature.

Handlers are merged into the enhanced props, whose identities are preserved across renders. This avoids a common pitfall where functional components create handlers inside the body of the function, which results in a new handler on every render and breaks downstream `shouldComponentUpdate()` optimizations that rely on prop equality. This is the main reason to use `useHandlers` to create handlers instead of using `usePropsMapper` or `useProps`, which will create new handlers every time when it get updated.

Usage example:

```js
const useEnhancer = pipe(
    useStateEnhancer('value', 'updateValue', ''),
    useHandlers({
        onChange: props => event => {
            props.updateValue(event.target.value)
        },
        onSubmit: props => event => {
            event.preventDefault()
            submitForm(props.value)
        },
    }),
)

function Form(props) {
    const { value, onChange, onSubmit } = useEnhancer(props)
    return (
        <form onSubmit={onSubmit}>
            <label>
                Value
                <input type="text" value={value} onChange={onChange} />
            </label>
        </form>
    )
}
```

### `useDefaultProps()`

```js
useDefaultProps(
  defaultProps: Object
): (props: Object) => {...defaultProps, ...props}
```

Specifies props to be passed by default to the base component. Similar to `useProps()`, except the props from the owner take precedence over props provided by the component.

Although it has a similar effect, using the `useDefaultProps()` hook is _not_ the same as setting the static `defaultProps` property directly on the component.

### `usePropRenamer()`

```js
usePropRenamer(
  oldName: string,
  newName: string
): (props: Object) => {...props, [newName]: props[oldName], [oldName]: undefined}
```

Renames a single prop.

Example:

```js
const useEnhancer = pipe(
    useProps({ loadingDataFromApi: true, posts: [] }),
    usePropRenamer('loadingDataFromApi', 'isLoading'),
    usePropRenamer('posts', 'items'),
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

### `usePropsRenamer()`

```js
usePropsRenamer(
  nameMap: { [key: string]: string }
): (props: Object) => {...props, ...nameMap}
```

Renames multiple props, using a map of old prop names to new prop names.

Example:

```js
const useEnhancer = pipe(
    useProps({ loadingDataFromApi: true, posts: [] }),
    usePropsRenamer({ loadingDataFromApi: 'isLoading', posts: 'items' }),
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

### `usePropFlattener()`

```js
usePropFlattener(
  propName: string
): HigherOrderComponent
```

Flattens a prop so that its fields are spread out into the props object.

```js
const useEnhancer = pipe(
    useProps({
        object: { a: 'a', b: 'b' },
        c: 'c',
    }),
    usePropFlattener('object'),
)

function Component(props) {
    const { a, b, c, object } = useEnhancer(props)
    // ...
}
```

An example use case for `usePropFlattener()` is when receiving fragment data from Relay. Relay fragments are passed as an object of props, which you often want flattened out into its constituent fields:

```js
// The `post` prop is an object with title, author, and content fields
const useEnhancer = usePropFlattener('post')
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

### `useStateEnhancer()`

```js
useStateEnhancer(
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

The first form accepts a function which maps the previous state value to a new state value. You'll likely want to use this state updater along with `useHandlers()` to create specific updater functions. For example, to create a hook that adds basic counting functionality to a component:

```js
const useCounter = pipe(
    useStateEnhancer('count', 'setCount', 0),
    useHandlers({
        increment: ({ setCount }) => () => setCount(n => n + 1),
        decrement: ({ setCount }) => () => setCount(n => n - 1),
        reset: ({ setCount }) => () => setCount(0),
    }),
)
```

The second form accepts a single value, which is used as the new state.

Both forms accept an optional second parameter, a callback function that will be executed once `setState()` is completed and the component is re-rendered.

An initial state value is required. It can be either the state value itself, or a function that returns an initial state given the initial props.

### `useStateHandlers()`

```js
useStateHandlers(
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
const useCounter = useStateEnhancerHandlers(
    ({ initialCounter = 0 }) => ({
        counter: initialCounter,
    }),
    {
        incrementOn: ({ counter }) => value => ({
            counter: counter + value,
        }),
        decrementOn: ({ counter }) => value => ({
            counter: counter - value,
        }),
        resetCounter: (_, { initialCounter = 0 }) => () => ({
            counter: initialCounter,
        }),
    },
)
function Counter(props) {
    const { counter, incrementOn, decrementOn, resetCounter } = useCounter(
        props,
    )
    return (
        <div>
            <Button onClick={() => incrementOn(2)}>Inc</Button>
            <Button onClick={() => decrementOn(3)}>Dec</Button>
            <Button onClick={resetCounter}>Reset</Button>
        </div>
    )
}
```

### `useReducerEnhancer()`

```js
useReducerEnhancer<S, A>(
  stateName: string,
  dispatchName: string,
  reducer: (state: S, action: A) => S,
  initialState: S | (ownerProps: Object) => S
): (props: Object) => {...props, [stateName]: initialState, dispatchName}
```

Similar to `useStateEnhancer()`, but state updates are applied using a reducer function. A reducer is a function that receives a state and an action, and returns a new state.

Returns two additional props to the component: a state value, and a dispatch method. The dispatch method has the following signature:

```js
dispatch(action: Object, ?callback: Function): void
```

It sends an action to the reducer, after which the new state is applied. It also accepts an optional second parameter, a callback function with the new state as its only argument.

### `useContextEnhancer()`

```js
useContextEnhancer(
Context: React.Context, contextMapper: (contextValue) => any | string
):(props: Object) => {...props, ...contextMapper}
```

Provides context to the component. `Context` is a React.Context, and `contextMapper` provides the key or objectMap to be merged with the props.

### `useLifecycle()`

```js
useLifecycle(
  spec: Object,
): HigherOrderComponent
```

A a hook version of [`React.Component()`](https://facebook.github.io/react/docs/react-api.html#react.component) common lifecycles. It supports only the `componentDidMount`, `componentWillUnmount`, `shouldComponentUpdate` lifecycles. Please note that these are not the same synchronous methods that React calls, but only simulated using hooks.

Any state changes made in a useLifecycle method, by using `setState`, will be propagated to the wrapped component as props.

Example:

```js
const useEnhancer = useLifecycle({
    componentDidMount() {
        fetchPosts().then(posts => {
            this.setState({ posts })
        })
    },
})

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
    useLifecycle({
        componentDidMount() {
            fetchPosts().then(posts => {
                this.setState({ posts })
            })
        },
    }),
    useDefaultProps({ posts: [] }),
)

function PostsList(props) {
    // posts will be defaulted
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

### `usePropTypes()`

```js
usePropTypes(
  propTypes: React.PropTypes,
  componentName: string
): (props: Object) => {...props}
```

In many cases, the props being created by these hooks cannot be type checked with `Component.propTypes`. This allows for prop checking in these cases

Example:

```js
const useCounter = pipe(
    useStateEnhancer('count', 'setCount', 0),
    useHandlers({
        increment: ({ setCount }) => () => setCount(n => n + 1),
        decrement: ({ setCount }) => () => setCount(n => n - 1),
        reset: ({ setCount }) => () => setCount(0),
    }),
    usePropTypes({
        counter: PropTypes.number,
        increment: PropTypes.func,
        decrement: PropTypes.func,
        reset: PropTypes.func,
    }),
)
```

## Utilities

Re-Enhance also includes some additional helpers that aren't hooks.

### `compose()`

```js
compose(...functions: Array<Function>): Function
```

Use to compose multiple hooks into a single hook. This flows from left to right (or bottom up).

### `pipe()`

```js
pipe(...functions: Array<Function>): Function
```

Use to compose multiple hooks into a single hook. This flows from right to left (or top down).
