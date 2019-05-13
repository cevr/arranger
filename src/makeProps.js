import { useMemo } from 'react'

import isFunction from './utils/isFunction'

const makeProps = fn => (props = {}) => {
    const mapped = useMemo(() => (isFunction(fn) ? fn(props) : fn), [props])

    const enhancedProps = useMemo(() => ({ ...props, ...mapped }), [
        props,
        mapped,
    ])
    return enhancedProps
}

export default makeProps
