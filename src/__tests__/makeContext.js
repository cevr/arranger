/* eslint-env jest */
import makeContext from '../makeContext'
import testWrapper, { Context } from '../utils/testWrapper'

test('consumes context', () => {
    const wrapper = testWrapper(makeContext(Context, value => ({ value })))
    const stringWrapper = testWrapper(makeContext(Context, 'value'))
    const noMapperWrapper = testWrapper(makeContext(Context))

    expect(wrapper.getProps().value).toBe('test')
    expect(stringWrapper.getProps().value).toBe('test')
    expect(noMapperWrapper.getProps().contextValue).toBe('test')
})
