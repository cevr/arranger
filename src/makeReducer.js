import { useReducer, useMemo } from 'react'

import isFunction from './utils/isFunction'

const makeReducer = (
    stateName,
    dispatchName,
    reducer,
    initialState,
    initialAction,
) => props => {
    const [rawState, rawDispatch] = useReducer(
        reducer,
        isFunction(initialState)
            ? useMemo(() => initialState(props), [])
            : initialState,
        initialAction,
    )

    const { state, dispatch } = useMemo(() => ({
        state: rawState,
        dispatch: rawDispatch,
    }))

    const enhancedProps = useMemo(
        () => ({ ...props, [stateName]: state, [dispatchName]: dispatch }),
        [props, state, dispatch],
    )
    return enhancedProps
}

export default makeReducer
