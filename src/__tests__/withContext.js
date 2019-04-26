/* eslint-env jest */
import withContext from '../withContext'
import testWrapper, { Context } from '../utils/testWrapper'

test('consumes context', () => {
    const wrapper = testWrapper(withContext(Context, value => ({ value })))
    const stringWrapper = testWrapper(withContext(Context, 'value'))
    const noMapperWrapper = testWrapper(withContext(Context))

    expect(wrapper.getProps().value).toBe('test')
    expect(stringWrapper.getProps().value).toBe('test')
    expect(noMapperWrapper.getProps().contextValue).toBe('test')
})
