import { useState } from 'react'

import isFunction from './isFunction'

function useLegacyState(initialState, cb) {
    const [state, setStateRaw] = useState(initialState, cb)
    const setState = update =>
        setStateRaw(currentState => ({
            ...currentState,
            ...(isFunction(update) ? update(currentState) : update),
        }))

    return [state, setState]
}

export default useLegacyState
