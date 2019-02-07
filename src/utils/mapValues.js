const mapValues = (obj, func) =>
    Object.entries(obj).reduce(
        (results, [key, value]) => ({
            ...results,
            [key]: func(value, key),
        }),
        {},
    )

export default mapValues
