import { useEffect } from 'react'

const useEffectEnhancer = effect => (props = {}) => {
    useEffect(() => effect(props), [props])

    return { ...props }
}

export default useEffectEnhancer
