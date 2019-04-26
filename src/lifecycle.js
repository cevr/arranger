import { useEffect } from 'react'
import useLegacyState from './utils/useLegacyState'
import usePrevious from './utils/usePrevious'
/**
 * Note: shouldComponentUpdate does not prevent rerenders.
 * It prevents componentDidUpdate from being called next render
 * @param {} getSpec
 * @returns {Object}
 */
const lifecycle = getSpec => (props = {}) => {
    const [state, setState] = useLegacyState({})
    const previousProps = usePrevious(props) || {}
    const previousState = usePrevious(state) || {}

    const self = {
        props,
        state,
        setState,
        prevProps: previousProps,
        prevState: previousState,
    }
    const spec = getSpec(self)
    const shouldUpdate =
        typeof spec.shouldUpdate === 'function' ? spec.shouldUpdate() : true

    useEffect(() => {
        if (typeof spec.onMount === 'function') spec.onMount()
        return () => {
            if (typeof spec.onUnmount === 'function') spec.onUnmount()
        }
    }, [])

    useEffect(() => {
        if (shouldUpdate && typeof spec.onUpdate === 'function') spec.onUpdate()
    })

    return { ...props, ...state }
}

export default lifecycle
