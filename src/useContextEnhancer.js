import { useContext, useMemo } from 'react'

/**
 * Adds the consumed Context into the enhanced Props. By default it is mapped to `contextValue`
 * @param {React.Context} context
 * @param {Function} propMapper function that maps the consumed context.
 * If not provided, the consumed context will be mapped to `contextValue
 */
const useContextEnhancer = (context, propMapper) => (props = {}) => {
    const contextValue = useContext(context)

    const mappedContext = useMemo(
        () =>
            // eslint-disable-next-line
            typeof propMapper === 'function'
                ? propMapper(contextValue)
                : typeof propMapper === 'string'
                ? { [propMapper]: contextValue }
                : { contextValue },
        [contextValue],
    )

    return { ...props, ...mappedContext }
}

export default useContextEnhancer
