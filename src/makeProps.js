/**
 *
 * @param {Function|Object} fn
 */
const makeProps = fn => (props = {}) => ({
    ...props,
    ...(typeof fn === 'function' ? fn(props) : fn),
})

export default makeProps
