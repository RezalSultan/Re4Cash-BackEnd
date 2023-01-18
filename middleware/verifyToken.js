require("dotenv").config();
const jwt = require("jsonwebtoken");
const {query} = require("../config/query");

const verifyTokenUsers = async (req, res, next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(" ")[1]

   if(token == null) return res.sendStatus(401)

   try {
      const {userId, email} = jwt.verify(token, `${process.env.USERS_TOKEN}`)

      // adding validation 
      const checkUser = await query(`
         SELECT id_user as id FROM users WHERE id_user = ${userId}
      `);

      if(checkUser.length === 0 ) return  res.status(401).json({
         message : "Unauthorize user!"
      })

      req.user = {userId, email};
      next()
   } catch (error) {
      console.log(error)
      res.status(401).json({
         message : "Unauthorize user!"
      })
   }
}

module.exports = {verifyTokenUsers};