import { useContext, useMemo } from 'react'

import isFunction from './utils/isFunction'

/**
 * Adds the consumed Context into the enhanced Props. By default it is mapped to `contextValue`
 * @param {React.Context} context
 * @param {Function} propMapper function that maps the consumed context.
 * If not provided, the consumed context will be mapped to `contextValue
 */
const makeContext = (context, propMapper) => (props = {}) => {
    const contextValue = useContext(context)

    const mappedContext = useMemo(
        () =>
            // eslint-disable-next-line
            isFunction(propMapper)
                ? propMapper(contextValue)
                : typeof propMapper === 'string'
                ? { [propMapper]: contextValue }
                : { contextValue },
        [contextValue],
    )

    const enhancedProps = useMemo(() => ({ ...props, ...mappedContext }), [
        props,
        mappedContext,
    ])

    return enhancedProps
}

export default makeContext
