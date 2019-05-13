import { useMemo } from 'react'

import isFunction from './utils/isFunction'

const makeHook = mapper => (props = {}) => {
    const mapped = useMemo(
        () => (isFunction(mapper) ? mapper(props) : mapper),
        [props],
    )

    const enhancedProps = useMemo(() => ({ ...props, ...mapped }), [
        props,
        mapped,
    ])

    return enhancedProps
}

export default makeHook
