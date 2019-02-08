/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useStateEnhancer from '../useStateEnhancer'

test('usestate', () => {
    const getProps = testWrapper(useStateEnhancer('state', 'setState', 0))

    expect(getProps().state).toEqual(0)
    getProps().setState(1)
    expect(getProps().state).toEqual(1)
})
