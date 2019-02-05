import { useContext as useReactContext, useMemo } from 'react'

/**
 * @param {React.Context} context
 * @param {Function} propMapper
 */
const useContext = (context, propMapper) => (props = {}) => {
    const contextValue = useReactContext(context)

    const mappedContext =
        typeof propMapper === 'function'
            ? useMemo(() => propMapper(contextValue), [])
            : { contextValue }

    return { ...props, ...mappedContext }
}

export default useContext
