## Arranger

`arranger` is a React utility belt for React hooks. It merges the API of `recompose` with hooks.

[**Full API documentation**](docs/API.md) - Learn about each helper

```
npm install arranger
```

```
yarn add arranger
```

## Why

[Dan Abramov - Making Sense of React Hooks](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)

I think with the introduction of hooks, we have finally made a great innovation in the methodology of front-end design. With hooks, there will be the rise of new paradigms!

However, I've noticed that composing many hooks together for bigger components can leave a lot of business logic cluttering the presentational login inside a component. Recompose allowed one to visually separate these concerns, and arranger continues where it left off.

## Usage

All functions are available on the top-level export.

```js
import { pipe, mapProps, makeState /* ... */ } from 'arranger'
```

### Composition

arranger helpers are designed to be composable. It maintains much of the patterns of `recompose` but with a slight change.

#### Recompose

```js
const BaseComponent = props => {...}

const enhance = compose(
  withState(/*...args*/),
  mapProps(/*...args*/),
  pure
)
const EnhancedComponent = enhance(BaseComponent)
```

#### Arranger

```js
const useEnhancer = pipe(
    makeState(/*...args*/),
    mapProps(/*...args*/),
    /*pure cannot be hooked 😔*/
)

// But you can use memo!
const BaseComponent = React.memo(props => {
    const enhancedProps = useEnhancer(props)
    // ...
})
```

#### Example

```js
import React from 'react'
import { pipe, makeHandlers, makeState } from 'arranger'

const useEnhancer = pipe(
    makeState('count', 'setCounter', 0),
    makeHandlers({
        inc: ({ setCounter }) => () => setCounter(count => count + 1),
        dec: ({ setCounter }) => () => setCounter(count => count - 1),
    }),
)

function Component(props) {
    const { count, inc, dec } = useEnhancer(props)
    return (
        <div>
            <button onClick={inc}>Inc</button>
            {count}
            <button onClick={dec}>Dec</button>
        </div>
    )
}

export default Component
```

## Feedback wanted

Due to the limitations of Hooks, `recompose` could not be totally ported using React Hooks. However, I may add some of the HOC's to this project for convenience!

If you think that more Hooks can be added, feel free to contribute! 🎉🎉
