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
         SELECT id FROM users WHERE id = ${userId}
      `);
      console.log(checkUser)

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

const verifyTokenPengelola = async (req, res, next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(" ")[1]

   if(token == null) return res.sendStatus(401)

   try {
      const {userId, pengelolaId, namaPengelola} = jwt.verify(token, `${process.env.PENGELOLA_TOKEN}`)

      // adding validation 
      const checkPengelola = await query(`
         SELECT id FROM pengelola WHERE id = ${pengelolaId}
      `);

      if(checkPengelola.length === 0 ) return  res.status(401).json({
         message : "Unauthorize pengelola!"
      })

      req.pengelola = {userId, pengelolaId, namaPengelola};
      next()
   } catch (error) {
      console.log(error)
      res.status(401).json({
         message : "Unauthorize pengelola!"
      })
   }
}

module.exports = {
   verifyTokenUsers,
   verifyTokenPengelola
};