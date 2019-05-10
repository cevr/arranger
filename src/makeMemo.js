import { useMemo } from 'react'

import pick from './utils/pick'

const makeMemo = (getToMemo, deps) => (props = {}) => {
    const effectDeps = pick(deps, props)
    const toMemo = getToMemo(props)
    if (typeof toMemo !== 'function' && process.env.NODE_ENV !== 'production') {
        throw new Error(
            'makeMemo() expects a function to be returned from the first paramter',
        )
    }
    const memoized = useMemo(() => toMemo(), [effectDeps])

    return { ...props, ...memoized }
}

export default makeMemo
