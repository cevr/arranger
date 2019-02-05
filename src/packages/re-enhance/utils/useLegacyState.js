import { useState } from 'react'

function useLegacyState(initialState, cb) {
    const [state, setStateRaw] = useState(initialState, cb)
    const setState = update =>
        setStateRaw(currentState => ({
            ...currentState,
            ...(typeof update === 'function' ? update(currentState) : update),
        }))

    return [state, setState]
}

export default useLegacyState
