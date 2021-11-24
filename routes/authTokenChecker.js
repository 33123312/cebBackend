module.exports = req => {
    let token = req.headers.authorization
    return token === "Basic pocheto"
}