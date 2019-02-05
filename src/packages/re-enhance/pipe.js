const pipe = (...fns) => (props = {}) => fns.reduce((v, f) => f(v), props)

export default pipe
