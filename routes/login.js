
const express = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post(
    "/login",
    async (req, res, next) => {
        passport.authenticate(
            "login",
            async (error,user,msg) =>{
                if(error) return next(error)
                
                try {
                    req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const token = generateToken(user)
                        res.send(token );
                    });

                } catch (error) {
                    return next(error);
                }
            })(req, res, next);
        }
    )

function generateToken(aluId){
    return jwt.sign({ user: aluId }, process.env.JWT_SECRET, { expiresIn: 60*60*24});
}

module.exports = router