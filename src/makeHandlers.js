import { useMemo } from 'react'

import mapValues from './utils/mapValues'
import isFunction from './utils/isFunction'

const makeHandlers = handlers => (props = {}) => {
    const boundHandlers = mapValues(
        handlers,
        useMemo(
            () => createHandler => (...args) => {
                const handler = createHandler(props)
                // incase state is set in the handler
                // we need to persist SyntheticEvent
                if (args[0] && isFunction(args[0].persist)) {
                    args[0].persist()
                }
                if (
                    process.env.NODE_ENV !== 'production' &&
                    !isFunction(handler)
                ) {
                    throw new Error(
                        'makeHandlers(): Expected a map of higher-order functions. ' +
                            'Refer to the docs for more info.',
                    )
                }

                return handler(...args)
            },
            [props],
        ),
    )

    const enhancedProps = useMemo(() => ({ ...props, ...boundHandlers }), [
        props,
        boundHandlers,
    ])

    return enhancedProps
}

export default makeHandlers
