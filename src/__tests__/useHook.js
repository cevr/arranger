/* eslint-env jest */
import { useState } from 'react'

import testWrapper from '../utils/testWrapper'
import useHook from '../useHook'

test('maps hooks to props', () => {
    let name
    let setName
    const getProps = testWrapper(
        useHook(props => {
            ;[name, setName] = useState(props.name)
            return { name, setName }
        }),
        {
            name: 'Sammy',
        },
    )

    expect(getProps().name).toBe('Sammy')
    expect(getProps().setName).toBe(setName)
})
