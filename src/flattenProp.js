import { useMemo } from 'react'

const flattenProp = propName => (props = {}) => {
    return useMemo(
        () => ({
            ...props,
            ...props[propName],
        }),
        [props, propName],
    )
}

export default flattenProp
