function pick(names, obj) {
    const result = []

    names.forEach(name => {
        if (obj[name]) {
            result.push(obj[name])
        }
    })
    return result
}

export default pick
