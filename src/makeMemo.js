import { useMemo } from 'react'

import pick from './utils/pick'

const makeMemo = (mapper, deps) => (props = {}) => {
    const effectDeps = pick(deps, props)
    const toMemo = typeof mapper === 'function' ? mapper(props) : mapper
    if (typeof toMemo !== 'function' && process.env.NODE_ENV !== 'production') {
        throw new Error(
            'makeMemo() expects a function to be returned from the first paramter',
        )
    }
    const mapped = useMemo(() => toMemo, [effectDeps])

    return { ...props, ...mapped }
}

export default makeMemo
