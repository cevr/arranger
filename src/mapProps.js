import { useMemo } from 'react'

const mapProps = fn => (props = {}) => {
    return useMemo(() => fn(props), [fn, props])
}

export default mapProps
