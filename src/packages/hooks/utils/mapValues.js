const mapValues = (obj, func) => {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = func(obj[key], key);
        }
    }
    return result;
};

export default mapValues;
