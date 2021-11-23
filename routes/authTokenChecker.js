module.exports = req => {
    let token = req.headers["Authorization"]
    console.log(token)
    return token === "pocheto"
}