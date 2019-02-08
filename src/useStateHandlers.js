import useLegacyState from './utils/useLegacyState'
import mapValues from './utils/mapValues'

/**
 *
 * @param {any} initialValue
 * @param {Object} handlers
 * @returns {Object}
 */
const useStateHandlers = (initialValue, handlers) => (props = {}) => {
    const [state, setState] = useLegacyState(
        typeof initialValue === 'function'
            ? () => initialValue(props)
            : initialValue,
    )

    const boundHandlers = mapValues(handlers, handler => (...args) => {
        // Having that functional form of setState can be called async
        // we need to persist SyntheticEvent
        if (args[0] && typeof args[0].persist === 'function') {
            args[0].persist()
        }
        setState(currentState => handler(currentState, props)(...args))
    })

    return { ...props, ...state, ...boundHandlers }
}

export default useStateHandlers
