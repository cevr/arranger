import { useEffect } from 'react'

import pick from './utils/pick'

const useEffectEnhancer = (deps, effect) => (props = {}) => {
    const effectDeps = pick(deps, props)
    useEffect(() => effect(props), effectDeps)

    return { ...props }
}

export default useEffectEnhancer
