import { useMemo } from 'react'

import usePrevious from './utils/usePrevious'

/**
 *
 * @param {any} shouldMapOrKeys
 * @param {Function} createProps
 * @returns {Object}
 */
const withPropsOnChange = (shouldMapOrKeys, createProps) => (props = {}) => {
    const previousProps = usePrevious(props)

    // eslint-disable-next-line
    const keys = Array.isArray(shouldMapOrKeys)
        ? shouldMapOrKeys.map(key => props[key])
        : shouldMapOrKeys(props, previousProps)
        ? undefined
        : []

    const mappedProps = useMemo(() => createProps(props), keys)

    return {
        ...props,
        ...mappedProps,
    }
}

export default withPropsOnChange
