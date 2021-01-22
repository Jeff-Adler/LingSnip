const tr = require("googletrans").default;
const { langs } = require('../utils/languages')

const isLang = (value) => {
    return langs.has(value.toLowerCase())
}

module.exports = isLang


