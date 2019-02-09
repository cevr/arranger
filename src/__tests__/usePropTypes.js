/* eslint-env jest */
import PropTypes from 'prop-types'

import testWrapper from '../utils/testWrapper'
import usePropTypes from '../usePropTypes'

test('checks proptypes', () => {
    const propTypes = {
        a: PropTypes.string,
        b: PropTypes.number,
        c: PropTypes.bool,
        d: PropTypes.object,
        e: PropTypes.array,
    }
    const propsValid = {
        a: 'test',
        b: 0,
        c: true,
        d: {},
        e: [],
    }

    const propsInvalid = {
        a: 1,
        b: '1',
        c: 'a',
        d: [],
        e: {},
    }
    const spy = jest.spyOn(global.console, 'error')
    testWrapper(usePropTypes(propTypes), propsValid)
    expect(spy).not.toHaveBeenCalled()
    testWrapper(usePropTypes(propTypes), propsInvalid)
    expect(spy).toHaveBeenCalled()
})
