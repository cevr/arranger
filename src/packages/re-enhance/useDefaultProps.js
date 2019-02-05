/**
 * @param {Object} useDefaultProps
 * @returns {Object}
 */
const useDefaultProps = defaultProps => (props = {}) => ({
    ...defaultProps,
    ...props,
})

export default useDefaultProps
