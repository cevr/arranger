/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import pipe from '../pipe'
import withState from '../withState'
import withPropsOnChange from '../withPropsOnChange'

test('maps props using fn true', () => {
    let called = 0
    const wrapper = testWrapper(
        pipe(
            withState('b', 'setB', 0),
            withPropsOnChange(
                () => true,
                ({ b }) => {
                    called += 1
                    return { c: b }
                },
            ),
        ),
        {
            a: true,
        },
    )

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(0)
    expect(called).toBe(1)
    wrapper.getProps().setB(1)
    expect(called).toBe(2)
    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().c).toBe(1)
})

test('maps props using fn false', () => {
    let called = 0
    const wrapper = testWrapper(
        pipe(
            withState('b', 'setB', 0),
            withPropsOnChange(
                () => false,
                ({ b }) => {
                    called += 1
                    return { c: b }
                },
            ),
        ),
        {
            a: true,
        },
    )

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(0)
    expect(called).toBe(1)
    wrapper.getProps().setB(1)
    expect(called).toBe(1)
    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().c).toBe(0)
})

test('maps props using keys', () => {
    let called = 0
    const wrapper = testWrapper(
        pipe(
            withState('b', 'setB', 0),
            withPropsOnChange(['b'], ({ b }) => {
                called += 1
                return { b }
            }),
        ),
        {
            a: true,
        },
    )

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(0)
    expect(called).toBe(1)
    wrapper.getProps().setB(1)
    expect(called).toBe(2)
    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(1)
})
