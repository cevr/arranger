import { useReducer, useMemo } from 'react'

/**
 * @param {string|symbol} stateName
 * @param {string|symbol} dispatchName
 * @param {Function} reducer
 * @param {any} initialState
 */
const useReducerEnhancer = (
    stateName,
    dispatchName,
    reducer,
    initialState,
    initialAction,
) => props => {
    const [state, dispatch] = useReducer(
        reducer,
        typeof initialState === 'function'
            ? useMemo(() => initialState(props), [props])
            : initialState,
        initialAction,
    )

    return { ...props, [stateName]: state, [dispatchName]: dispatch }
}

export default useReducerEnhancer
