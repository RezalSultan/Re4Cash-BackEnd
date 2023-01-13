require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(" ")[1]

   if(token == null) return res.sendStatus(401)

   try {
      const user = await jwt.verify(token, `${process.env.ACCESS_TOKEN}`)
      req.user = user.email
      next()
   } catch (error) {
      console.log(error)
      res.status(403).json({
         message : "token expired, data is not access"
      })
   }
}

module.exports = verifyToken;