import { useRef, useMemo } from 'react'

import isFunction from './utils/isFunction'

const makeRef = (refName, initialValue) => (props = {}) => {
    const rawRef = useRef(
        isFunction(initialValue) ? initialValue(props) : initialValue,
    )

    const ref = useMemo(() => rawRef, [rawRef])

    const enhancedProps = useMemo(
        () => ({
            ...props,
            [refName]: ref,
        }),
        [props, ref],
    )

    return enhancedProps
}

export default makeRef
