## Re-Enhance

Re-Enhance is a React utility belt for React hooks. It carries on the work of that Recompose started.

[**Full API documentation to come**]

```
npm install re-enhance
```

```
yarn add re-enhance
```

## Why

[Dan Abramov - Making Sense of React Hooks](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)
<p>
  <img src="https://i.imgur.com/02HCPy6.png" height="500" width="auto" />
  <img src="https://i.imgur.com/IxcHEEq.png" height="500" width="auto"/> 
</p>

## Usage

All functions are available on the top-level export.

```js
import { pipe, usePropMapper, useStateEnhancer /* ... */ } from 're-enhance'
```

### Composition

Re-Enhance helpers are designed to be composable. It maintains much of the patterns of `recompose` but with a slight change.

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

#### Re-Enhance

```js
const useEnhancer = pipe(
    useStateEnhancer(/*...args*/),
    usePropMapper(/*...args*/),
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
import React from 'react';
import { pipe, useHandlers, useStateEnhancer } from 're-enhance';

const useEnhancer = pipe(
    useStateEnhancer('counter', 'setCounter', 0),
    useHandlers({
        inc: ({ setCounter }) => () => setCounter(counter => counter + 1),
        dec: ({ setCounter }) => () => setCounter(counter => counter - 1),
    }),
);

function Component(props) {
    const { counter, inc, dec } = useEnhancer(props);
    return (
        <div>
            <button onClick={inc}>Inc</button>
            {counter}
            <button onClick={dec}>Dec</button>
        </div>
    );
}

export default Component;
```

## Feedback wanted

Due to the limitations of Hooks, `recompose` could not be totally ported using React Hooks. However, I may add some of the HOC's to this project for convenience!

If you think that more Hooks can be added, feel free to contribute! 🎉🎉
