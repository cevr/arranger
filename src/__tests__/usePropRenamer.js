/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import renameProp from '../usePropRenamer'

test('renames prop', () => {
    const wrapper = testWrapper(renameProp('val', 'renamed'), { val: true })

    expect(wrapper.getProps().renamed).toBe(true)
    expect(wrapper.getProps().val).toBeUndefined()
})
