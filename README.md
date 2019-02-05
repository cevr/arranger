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

<div class="center">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">ok so - I took dan&#39;s classes/hooks code from react conf, blacked out the &#39;unnecessary&#39; bits, then colour coded bits by &#39;concern&#39;. so much nicer. the effect is amplified in more complex components, where concerns are split and mixed across lifecycle methods. <a href="https://t.co/nPUzQcisFt">pic.twitter.com/nPUzQcisFt</a></p>&mdash; Sunil Pai (@threepointone) <a href="https://twitter.com/threepointone/status/1056594421079261185?ref_src=twsrc%5Etfw">October 28, 2018</a></blockquote>
  
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

</div>


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

const BaseComponent = props => {
    const enhancedProps = useEnhancer(props)
    // ...
}
```

## Feedback wanted

Due to the limitations of Hooks, `recompose` could not be totally ported using React Hooks. However, I may add some of the HOC's to this project for convenience!

If you think that more Hooks can be added, feel free to contribute! 🎉🎉
