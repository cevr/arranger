import { useState, useMemo } from 'react'

import isFunction from './utils/isFunction'

const makeState = (
    stateName,
    stateUpdaterName,
    initialState,
    { memo = false } = {},
) => (props = {}) => {
    const [rawState, rawSetState] = useState(
        // eslint-disable-next-line
        memo
            ? () =>
                  isFunction(initialState) ? initialState(props) : initialState
            : isFunction(initialState)
            ? initialState(props)
            : initialState,
    )

    const { state, setState } = useMemo(
        () => ({
            state: rawState,
            setState: rawSetState,
        }),
        [rawState],
    )

    const enhancedProps = useMemo(
        () => ({
            ...props,
            [stateName]: state,
            [stateUpdaterName]: setState,
        }),
        [props, state, setState],
    )

    return enhancedProps
}

export default makeState
