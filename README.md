## Re-Enhance

Re-Enhance is a React utility belt for React hooks. It carries on the work of that Recompose started.

[**Full API documentation**](docs/API.md) - Learn about each helper

```
npm install re-enhance
```

```
yarn add re-enhance
```

## Why

Forget ES6 classes vs. `createClass()`.

An idiomatic React application consists mostly of function components.

```js
const Greeting = props => <p>Hello, {props.name}!</p>
```

Function components have several key advantages:

-   They help prevent abuse of the `setState()` API, favoring props instead.
-   They encourage the ["smart" vs. "dumb" component pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
-   They encourage code that is more reusable and modular.
-   They discourage giant, complicated components that do too many things.
-   They allow React to make performance optimizations by avoiding unnecessary checks and memory allocations.

## Usage

All functions are available on the top-level export.

```js
import { pipe, usePropMapper, useStateEnhancer /* ... */ } from 're-enhance'
```

### Composition

Re-Enhance helpers are designed to be composable. It maintains much of the patterns of `recompose` but with a slight change.

#####Recompose

```js
const BaseComponent = props => {...}

const enhance = compose(
  withState(/*...args*/),
  mapProps(/*...args*/),
  pure
)
const EnhancedComponent = enhance(BaseComponent)
```

#####Re-enhance

```js
const useEnhancer = pipe(
    useStateEnhancer(/*...args*/),
    usePropMapper(/*...args*/),
)

const BaseComponent = props => {
    const enhancedProps = useEnhancer(props)
    // ...
}
```

## Feedback wanted

Project is still in the early stages. Due to the limitations of Hooks, `recompose` could not be totally ported using React Hooks. However, I may add some of the HOC's to this project for convenience!

If you think that more Hooks can be added, feel free to contribute!
