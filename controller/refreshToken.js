require("dotenv").config();
const usersModel = require("../model/users")
const jwt = require("jsonwebtoken")

const refreshToken = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken
      if(!refreshToken) return res.sendStatus(401)
      console.log(refreshToken)

      const user = await usersModel.getTokenUser({
         refresh_token : refreshToken
      })

      if(!user[0]) return res.sendStatus(403)

      jwt.verify(refreshToken, `${process.env.REFRSH_TOKEN}`, (err, decode) => {
         if(err) return res.sendStatus(403);
         const userId = user[0].id_user
         const email = user[0].email
         const accessToken = jwt.sign({userId, email}, `${process.env.ACCESS_TOKEN}`, {
            expiresIn: "30s"
         })
         res.json({accessToken})
      })

   } catch (error) {
      console.log("refresh token " + error)
   }
}

module.exports = {
   refreshToken
}