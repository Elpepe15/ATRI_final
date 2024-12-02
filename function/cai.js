const fs = require('fs-extra')
const toMs = require('ms')

/**
 * Add cai user.
 * @param {string} userId
 * @param {string} expired
 * @param {object} _dir
 */
const addCaiMember = (userId, expired, _dir) => {
    const obj = { id: userId, expired: Date.now() + toMs(expired) }
    _dir.push(obj)
    fs.writeFileSync('./database/bot/cai.json', JSON.stringify(_dir))
}

/**
 * Get cai user index position.
 * @param {string} userId
 * @param {object} _dir
 * @returns {Number}
 */
const getCaiPosition = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

/**
 * Get cai user expired.
 * @param {string} userId
 * @param {object} _dir
 * @returns {Number}
 */
const getCaiExpired = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].expired
    }
}

/**
 * Check if is user cai.
 * @param {string} userId
 * @param {object} _dir
 * @returns {boolean}
 */
const checkCaiUser = (userId, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true
        }
    })
    return status
}

/**
 * Constantly checking cai.
 * @param {object} _dir
 */
const cekExpired = (_dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`Cai user expired: ${_dir[position].id}`)
            _dir.splice(position, 1)
            fs.writeFileSync('./database/bot/cai.json', JSON.stringify(_dir))
        }
    }, 1000)
}

/**
 * Get all cai user ID.
 * @param {object} _dir
 * @returns {string[]}
 */
const getAllCaiUser = (_dir) => {
    const array = []
    Object.keys(_dir).forEach((i) => {
        array.push(_dir[i].id)
    })
    return array
}

module.exports = {
    addCaiMember,
    getCaiExpired,
    getCaiPosition,
    cekExpired,
    checkCaiUser,
    getAllCaiUser
}
