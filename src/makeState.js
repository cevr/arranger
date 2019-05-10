import { useState } from 'react'

/**
 * @param {string|symbol} stateName
 * @param {string|symbol} stateUpdaterName
 * @param {any} initialState
 */
const makeState = (stateName, stateUpdaterName, initialState) => (
    props = {},
) => {
    const [state, update] = useState(
        typeof initialState === 'function'
            ? () => initialState(props)
            : initialState,
    )

    return {
        ...props,
        [stateName]: state,
        [stateUpdaterName]: update,
    }
}

export default makeState
