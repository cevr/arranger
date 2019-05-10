const makeHook = mapper => (props = {}) => {
    const mapped = typeof mapper === 'function' ? mapper(props) : mapper

    return { ...props, ...mapped }
}

export default makeHook
