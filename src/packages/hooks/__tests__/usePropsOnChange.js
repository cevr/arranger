/* eslint-env jest */

import { testWrapper } from '../utils';
import pipe from '../pipe';
import useStateEnhancer from '../useStateEnhancer';
import usePropsOnChange from '../usePropsOnChange';

test('maps props using fn true', () => {
    let called = 0;
    const getProps = testWrapper(
        pipe(
            useStateEnhancer('b', 'setB', 0),
            usePropsOnChange(
                () => true,
                ({ b }) => {
                    called += 1;
                    return { c: b };
                },
            ),
        ),
        {
            a: true,
        },
    );

    expect(getProps().a).toBe(true);
    expect(getProps().b).toBe(0);
    expect(called).toBe(1);
    getProps().setB(1);
    expect(called).toBe(2);
    expect(getProps().a).toBe(true);
    expect(getProps().c).toBe(1);
});

test('maps props using fn false', () => {
    let called = 0;
    const getProps = testWrapper(
        pipe(
            useStateEnhancer('b', 'setB', 0),
            usePropsOnChange(
                () => false,
                ({ b }) => {
                    called += 1;
                    return { c: b };
                },
            ),
        ),
        {
            a: true,
        },
    );

    expect(getProps().a).toBe(true);
    expect(getProps().b).toBe(0);
    expect(called).toBe(1);
    getProps().setB(1);
    expect(called).toBe(1);
    expect(getProps().a).toBe(true);
    expect(getProps().c).toBe(0);
});

test('maps props using keys', () => {
    let called = 0;
    const getProps = testWrapper(
        pipe(
            useStateEnhancer('b', 'setB', 0),
            usePropsOnChange(['b'], ({ b }) => {
                called += 1;
                return { b };
            }),
        ),
        {
            a: true,
        },
    );

    expect(getProps().a).toBe(true);
    expect(getProps().b).toBe(0);
    expect(called).toBe(1);
    getProps().setB(1);
    expect(called).toBe(2);
    expect(getProps().a).toBe(true);
    expect(getProps().b).toBe(1);
});
