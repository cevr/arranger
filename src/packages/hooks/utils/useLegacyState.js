import { useState } from 'react';

function useLegacyState(initialState, cb) {
    const [state, setStateRaw] = useState(initialState, cb);
    const setState = update =>
        setStateRaw(state => ({ ...state, ...(typeof update === 'function' ? update(state) : update) }));

    return [state, setState];
}

export default useLegacyState;
