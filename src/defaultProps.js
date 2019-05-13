import { useMemo } from 'react'

const defaultProps = defaulted => (props = {}) => {
    return useMemo(() => ({ ...defaulted, ...props }), [defaulted, props])
}

export default defaultProps
