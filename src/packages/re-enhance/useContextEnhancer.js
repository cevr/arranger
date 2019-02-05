import { useContext, useMemo } from 'react'

/**
 * @param {React.Context} context
 * @param {Function} propMapper
 */
const useContextEnhancer = (context, propMapper) => (props = {}) => {
    const contextValue = useContext(context)

    const mappedContext =
        typeof propMapper === 'function'
            ? useMemo(() => propMapper(contextValue), [contextValue])
            : { contextValue }

    return { ...props, ...mappedContext }
}

export default useContextEnhancer
