/**
 *
 * @param {Function|Object} fn
 */
const useProps = fn => (props = {}) => ({
    ...props,
    ...(typeof fn === 'function' ? fn(props) : fn),
})

export default useProps
