import { useMemo, useCallback } from 'react'

import mapValues from './utils/mapValues'

/**
 * @param {Object} handlers
 * @returns {Object}
 */
const useHandlers = handlers => (props = {}) => {
    const realHandlers = useMemo(
        () => (typeof handlers === 'function' ? handlers(props) : handlers),
        [],
    )
    const boundHandlers = useCallback(
        mapValues(realHandlers, createHandler => (...args) => {
            const handler = createHandler(props)
            if (
                process.env.NODE_ENV !== 'production' &&
                typeof handler !== 'function'
            ) {
                // eslint-disable-next-line no-console
                console.error(
                    'useHandlers(): Expected a map of higher-order functions. ' +
                        'Refer to the docs for more info.',
                )
            }

            return handler(...args)
        }),
        [handlers, props],
    )

    return { ...props, ...boundHandlers }
}

export default useHandlers
