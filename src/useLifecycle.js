import { useEffect } from 'react'
import useLegacyState from './utils/useLegacyState'
import usePrevious from './utils/usePrevious'
/**
 * Note: shouldComponentUpdate does not prevent rerenders.
 * It prevents componentDidUpdate from being called next render
 * @param {} getSpec
 * @returns {Object}
 */
const useLifecycle = getSpec => (props = {}) => {
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
    const shouldUpdate = spec.shouldUpdate ? spec.shouldUpdate() : true

    useEffect(() => {
        if (spec.onMount) spec.onMount()
        return () => {
            if (spec.onUnmount) spec.onUnmount()
        }
    }, [])

    useEffect(() => {
        if (shouldUpdate && spec.onUpdate) spec.onUpdate()
    })

    return { ...props, ...state }
}

export default useLifecycle
