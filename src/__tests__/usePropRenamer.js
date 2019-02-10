/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import renameProp from '../usePropRenamer'

test('renames prop', () => {
    const getProps = testWrapper(renameProp('val', 'renamed'), { val: true })

    expect(getProps().renamed).toBe(true)
    expect(getProps().val).toBeUndefined()
})
