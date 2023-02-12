require("dotenv").config();
const jwt = require("jsonwebtoken");
const {query} = require("../config/query");
const usersModel = require("../model/users")
const bcrypt = require("bcrypt");

const login = async (req, res) => {
   try {
      const {body} = req
      const user = await usersModel.getEmailUser(body)

      const match = await bcrypt.compare(req.body.password, user[0].password)

      if(!match) return res.status(400).json({
         message : "password anda salah"
      })
      
      const userId = user[0].id_user
      const email = user[0].email
      const dataPengelola = await query(`SELECT * FROM pengelola WHERE id_users='${userId}'`)
      if(dataPengelola[0]){
         const pengelolaId = dataPengelola[0].id_pengelola
         const namaPengelola = dataPengelola[0].nama_pengelola
         const pengelolaToken = jwt.sign({userId, pengelolaId, namaPengelola}, `${process.env.PENGELOLA_TOKEN}`)
         await pengelolaModel.tokenPengelola({
            token_pengelola : pengelolaToken
            }, pengelolaId
         )
         res.json({
            message : "Login Sebagai Pengelola",
            Authorization: `Bearer ${pengelolaToken}`
         })
      }else{
         const usersToken = jwt.sign({userId, email}, `${process.env.USERS_TOKEN}`)
         await usersModel.tokenUsers({
            refresh_token : usersToken
            }, userId
         )
         res.json({
            message : "Login Sebagai Users",
            Authorization: `Bearer ${usersToken}`
         })
      }    

   } catch (error) {
      console.log(error)
      res.status(400).json({
         message : "email tidak ditemukan",
      })
   }
}


const logout = async (req, res) => {
   const userId = req.user.userId

   await usersModel.tokenUsers({
      refresh_token : null
   }, userId)

   res.json({
      message : "anda telah logout"
   })
}


const switchToPengelola = async (req, res) =>{
   const userId = req.user.userId
   const dataPengelola = await query(`SELECT * FROM pengelola WHERE id_users='${userId}'`)
   const pengelolaId = dataPengelola[0].id_pengelola
   const namaPengelola = dataPengelola[0].nama_pengelola
   try {
      const pengelolaToken = jwt.sign({userId, pengelolaId, namaPengelola}, `${process.env.PENGELOLA_TOKEN}`)
      await usersModel.tokenPengelola({
         token_pengelola : pengelolaToken
         }, pengelolaId
      )
      await usersModel.tokenUsers({
         refresh_token : null
      }, userId)  

      res.json({
         message : "Berhasil berganti ke pengelola",
         Authorization: `Bearer ${pengelolaToken}`
      })
   } catch (error) {
      res.status(400).json({
         message : "pengelola tidak ditemukan",
      })
   }
}

module.exports = {
   login,
   logout,
   switchToPengelola
}