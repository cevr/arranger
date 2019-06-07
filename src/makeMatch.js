import { useMemo } from 'react'

import isFunction from './utils/isFunction'

const makeMatch = (patternMapper, key = 'match') => (props = {}) => {
    const matchPattern = useMemo(() => patternMapper(props), [props])
    const enhancedProps = useMemo(
        () => ({
            ...props,
            [key]: matchWith =>
                Object.entries(matchPattern).reduce(
                    (matched, [matchKey, isMatch], index, arr) => {
                        if (matched) return matched
                        if (isMatch)
                            return isFunction(matchWith[matchKey])
                                ? matchWith[matchKey]()
                                : null
                        if (index === arr.length - 1)
                            return isFunction(matchWith._)
                                ? matchWith._()
                                : null
                        return null
                    },
                    null,
                ),
        }),
        [matchPattern, props],
    )
    return enhancedProps
}

export default makeMatch
