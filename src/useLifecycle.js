import { useEffect } from 'react'
import useLegacyState from './utils/useLegacyState'
import usePrevious from './utils/usePrevious'
/**
 * Note: shouldComponentUpdate does not prevent rerenders.
 * It prevents componentDidUpdate from being called next render
 * @param {} spec
 * @returns {Object}
 */
const useLifecycle = spec => (props = {}) => {
    const [state, setState] = useLegacyState({})

    const self = { props, state, setState }
    const previousProps = usePrevious(props) || {}
    const previousState = usePrevious(state) || {}
    const shouldUpdate = spec.shouldComponentUpdate
        ? spec.shouldComponentUpdate.call(
              { props: previousProps, state: previousState },
              props,
              state,
          )
        : true

    useEffect(() => {
        if (spec.componentDidMount) spec.componentDidMount.call(self)
        return () => {
            if (spec.componentWillUnmount)
                spec.componentWillUnmount.call({ props, state })
        }
    }, [])

    useEffect(() => {
        if (shouldUpdate && spec.componentDidUpdate)
            spec.componentDidUpdate.call(self, previousProps, previousState)
    })

    return { ...props, ...state }
}

export default useLifecycle
