import { useMemo } from 'react'

const renameProp = (initialProp, renamedProp) => ({
    [initialProp]: prop,
    ...props
} = {}) => {
    return useMemo(
        () => ({
            ...props,
            [renamedProp]: prop,
        }),
        [initialProp, renamedProp, props],
    )
}

export default renameProp
