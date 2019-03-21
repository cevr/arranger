/* eslint-env jest */
import { useState } from 'react'

import testWrapper from '../utils/testWrapper'
import useHook from '../useHook'

test('maps hooks to props', () => {
    let name
    let setName
    const wrapper = testWrapper(
        useHook(props => {
            ;[name, setName] = useState(props.name)
            return { name, setName }
        }),
        {
            name: 'Sammy',
        },
    )

    expect(wrapper.getProps().name).toBe('Sammy')
    expect(wrapper.getProps().setName).toBe(setName)
})
