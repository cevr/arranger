import { useMemo } from 'react'

import pick from './utils/pick'
import isFunction from './utils/isFunction'

const makeMemo = (getToMemo, deps) => (props = {}) => {
    const effectDeps = pick(deps, props)
    const toMemo = getToMemo(props)
    if (!isFunction(toMemo) && process.env.NODE_ENV !== 'production') {
        throw new Error(
            'makeMemo() expects a function to be returned from the first paramter',
        )
    }
    const memoized = useMemo(() => toMemo(), [effectDeps])

    const enhancedProps = useMemo(() => ({ ...props, ...memoized }), [
        props,
        memoized,
    ])
    return enhancedProps
}

export default makeMemo
