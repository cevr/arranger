/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import renameProp from '../usePropRenamer'

test('branch left', () => {
    const getProps = testWrapper(renameProp('val', 'renamed'), { val: true })

    expect(getProps().renamed).toBe(true)
})
