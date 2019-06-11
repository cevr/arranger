import { useMemo } from 'react'

import useLegacyState from './utils/useLegacyState'
import isFunction from './utils/isFunction'
import mapValues from './utils/mapValues'

const makeStateHandlers = (initialValue, handlers, { memo = false } = {}) => (
    props = {},
) => {
    const [rawState, rawSetState] = useLegacyState(
        // eslint-disable-next-line
        memo
            ? () =>
                  isFunction(initialValue) ? initialValue(props) : initialValue
            : isFunction(initialValue)
            ? initialValue(props)
            : initialValue,
    )

    const { state, setState } = useMemo(
        () => ({
            state: rawState,
            setState: rawSetState,
        }),
        [rawState],
    )

    const boundHandlers = mapValues(
        handlers,
        useMemo(() => handler => (...args) => {
            // Having that functional form of setState can be called async`
            // we need to persist SyntheticEvent
            if (args[0] && isFunction(args[0].persist)) {
                args[0].persist()
            }
            setState(currentState => handler(currentState, props)(...args))
        }),
        [props],
    )

    const enhancedProps = useMemo(
        () => ({ ...props, ...state, ...boundHandlers }),
        [props, state, boundHandlers],
    )

    return enhancedProps
}

export default makeStateHandlers
