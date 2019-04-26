/**
 * @param {Object} default
 * @returns {Object}
 */
const defaultProps = defaulted => (props = {}) => ({
    ...defaulted,
    ...props,
})

export default defaultProps
