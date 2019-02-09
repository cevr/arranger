import PropTypes from 'prop-types'

const usePropTypes = (propTypes, componentName = 'Component') => (
    props = {},
) => {
    PropTypes.checkPropTypes(propTypes, props, 'prop', componentName)
    return { ...props }
}

export default usePropTypes
