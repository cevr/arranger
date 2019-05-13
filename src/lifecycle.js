import { useEffect, useMemo } from 'react'

import isFunction from './utils/isFunction'
import useLegacyState from './utils/useLegacyState'
import usePrevious from './utils/usePrevious'

const lifecycle = getSpec => (props = {}) => {
    const [rawState, setState] = useLegacyState({})
    const previousProps = usePrevious(props) || {}
    const previousState = usePrevious(rawState) || {}

    const state = useMemo(() => rawState, [rawState])

    const self = {
        props,
        state,
        setState,
        prevProps: previousProps,
        prevState: previousState,
    }
    const spec = getSpec(self)
    const shouldUpdate = isFunction(spec.shouldUpdate)
        ? spec.shouldUpdate()
        : true

    useEffect(() => {
        if (isFunction(spec.onMount)) spec.onMount()
        return () => {
            if (isFunction(spec.onUnmount)) spec.onUnmount()
        }
    }, [])

    useEffect(() => {
        if (shouldUpdate && isFunction(spec.onUpdate)) spec.onUpdate()
    })

    const enhancedProps = useMemo(() => ({ ...props, ...state }), [
        props,
        state,
    ])

    return enhancedProps
}

export default lifecycle
