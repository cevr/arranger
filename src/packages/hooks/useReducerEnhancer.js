import { useReducer, useMemo } from 'react';

/**
 * @param {string|symbol} stateName
 * @param {string|symbol} dispatchName
 * @param {Function} reducer
 * @param {any} initialValue
 */
const useReducerEnhancer = (stateName, dispatchName, reducer, initialValue, initialAction) => props => {
    const [state, dispatch] = useReducer(
        reducer,
        typeof initialValue === 'function' ? useMemo(() => initialValue(props), []) : initialValue,
        initialAction,
    );

    return { ...props, [stateName]: state, [dispatchName]: dispatch };
};

export default useReducerEnhancer;
