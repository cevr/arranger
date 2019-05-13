const pipe = (...enhancers) => (props = {}) =>
    enhancers.reduce((propObj, enhancer) => enhancer(propObj), props)

export default pipe
