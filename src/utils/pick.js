function pick(names, obj) {
    return names.map(name => obj[name])
}

export default pick
