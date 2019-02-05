import { useCallback } from 'react'

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
        typeof initialValue === 'function' ? initialValue(props) : initialValue,
    )

    const boundHandlers = mapValues(
        handlers,
        handler => (mayBeEvent, ...args) => {
            // Having that functional form of setState can be called async
            // we need to persist SyntheticEvent
            if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
                mayBeEvent.persist()
            }
            setState(currentState =>
                useCallback(handler(currentState, props), [])(
                    mayBeEvent,
                    ...args,
                ),
            )
        },
    )

    return { ...props, ...state, ...boundHandlers }
}

export default useStateHandlers
