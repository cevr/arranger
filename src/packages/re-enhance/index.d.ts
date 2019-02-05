export = reEnhance
export as namespace reEnhance

declare namespace reEnhance {
    interface Static {
        compose<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1
        compose<V0, V1, T1>(fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T1
        compose<V0, V1, V2, T1>(
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
        ): (x0: V0, x1: V1, x2: V2) => T1

        compose<V0, T1, T2>(
            fn1: (x: T1) => T2,
            fn0: (x0: V0) => T1,
        ): (x0: V0) => T2
        compose<V0, V1, T1, T2>(
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1) => T1,
        ): (x0: V0, x1: V1) => T2
        compose<V0, V1, V2, T1, T2>(
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
        ): (x0: V0, x1: V1, x2: V2) => T2

        compose<V0, T1, T2, T3>(
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x: V0) => T1,
        ): (x: V0) => T3
        compose<V0, V1, T1, T2, T3>(
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1) => T1,
        ): (x0: V0, x1: V1) => T3
        compose<V0, V1, V2, T1, T2, T3>(
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
        ): (x0: V0, x1: V1, x2: V2) => T3

        compose<V0, T1, T2, T3, T4>(
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x: V0) => T1,
        ): (x: V0) => T4
        compose<V0, V1, T1, T2, T3, T4>(
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1) => T1,
        ): (x0: V0, x1: V1) => T4
        compose<V0, V1, V2, T1, T2, T3, T4>(
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
        ): (x0: V0, x1: V1, x2: V2) => T4

        compose<V0, T1, T2, T3, T4, T5>(
            fn4: (x: T4) => T5,
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x: V0) => T1,
        ): (x: V0) => T5
        compose<V0, V1, T1, T2, T3, T4, T5>(
            fn4: (x: T4) => T5,
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1) => T1,
        ): (x0: V0, x1: V1) => T5
        compose<V0, V1, V2, T1, T2, T3, T4, T5>(
            fn4: (x: T4) => T5,
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
        ): (x0: V0, x1: V1, x2: V2) => T5

        compose<V0, T1, T2, T3, T4, T5, T6>(
            fn5: (x: T5) => T6,
            fn4: (x: T4) => T5,
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x: V0) => T1,
        ): (x: V0) => T6
        compose<V0, V1, T1, T2, T3, T4, T5, T6>(
            fn5: (x: T5) => T6,
            fn4: (x: T4) => T5,
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1) => T1,
        ): (x0: V0, x1: V1) => T6
        compose<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
            fn5: (x: T5) => T6,
            fn4: (x: T4) => T5,
            fn3: (x: T3) => T4,
            fn2: (x: T2) => T3,
            fn1: (x: T1) => T2,
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
        ): (x0: V0, x1: V1, x2: V2) => T6

        pipe<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1
        pipe<V0, V1, T1>(fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T1
        pipe<V0, V1, V2, T1>(
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
        ): (x0: V0, x1: V1, x2: V2) => T1

        pipe<V0, T1, T2>(
            fn0: (x0: V0) => T1,
            fn1: (x: T1) => T2,
        ): (x0: V0) => T2
        pipe<V0, V1, T1, T2>(
            fn0: (x0: V0, x1: V1) => T1,
            fn1: (x: T1) => T2,
        ): (x0: V0, x1: V1) => T2
        pipe<V0, V1, V2, T1, T2>(
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
            fn1: (x: T1) => T2,
        ): (x0: V0, x1: V1, x2: V2) => T2

        pipe<V0, T1, T2, T3>(
            fn0: (x: V0) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
        ): (x: V0) => T3
        pipe<V0, V1, T1, T2, T3>(
            fn0: (x0: V0, x1: V1) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
        ): (x0: V0, x1: V1) => T3
        pipe<V0, V1, V2, T1, T2, T3>(
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
        ): (x0: V0, x1: V1, x2: V2) => T3

        pipe<V0, T1, T2, T3, T4>(
            fn0: (x: V0) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
        ): (x: V0) => T4
        pipe<V0, V1, T1, T2, T3, T4>(
            fn0: (x0: V0, x1: V1) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
        ): (x0: V0, x1: V1) => T4
        pipe<V0, V1, V2, T1, T2, T3, T4>(
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
        ): (x0: V0, x1: V1, x2: V2) => T4

        pipe<V0, T1, T2, T3, T4, T5>(
            fn0: (x: V0) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
            fn4: (x: T4) => T5,
        ): (x: V0) => T5
        pipe<V0, V1, T1, T2, T3, T4, T5>(
            fn0: (x0: V0, x1: V1) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
            fn4: (x: T4) => T5,
        ): (x0: V0, x1: V1) => T5
        pipe<V0, V1, V2, T1, T2, T3, T4, T5>(
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
            fn4: (x: T4) => T5,
        ): (x0: V0, x1: V1, x2: V2) => T5

        pipe<V0, T1, T2, T3, T4, T5, T6>(
            fn0: (x: V0) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
            fn4: (x: T4) => T5,
            fn5: (x: T5) => T6,
        ): (x: V0) => T6
        pipe<V0, V1, T1, T2, T3, T4, T5, T6>(
            fn0: (x0: V0, x1: V1) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
            fn4: (x: T4) => T5,
            fn5: (x: T5) => T6,
        ): (x0: V0, x1: V1) => T6
        pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
            fn0: (x0: V0, x1: V1, x2: V2) => T1,
            fn1: (x: T1) => T2,
            fn2: (x: T2) => T3,
            fn3: (x: T3) => T4,
            fn4: (x: T4) => T5,
            fn5: (x: T5) => T6,
        ): (x0: V0, x1: V1, x2: V2) => T6
    }
}
