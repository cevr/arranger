import { useMemo } from 'react'

const renameProps = propMap => (props = {}) => {
    return useMemo(
        () => ({
            // Remove renamed props
            ...Object.entries(props)
                .filter(([key]) => !(key in propMap))
                .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
            // Rename props
            ...Object.entries(propMap)
                .map(([oldName, newName]) => [newName, props[oldName]])
                .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
        }),
        [propMap, props],
    )
}

export default renameProps
