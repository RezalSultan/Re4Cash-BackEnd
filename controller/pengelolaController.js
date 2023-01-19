require("dotenv").config();
const {query} = require("../config/query");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../model/users")
const pengelolaModel = require("../model/pengelola")

const getAllPengelola= async (req, res) => {
   try {
      const data = await query('SELECT id_pengelola, id_users, fullname_users, nama_pengelola, no_hp_pengelola, no_rekening, email_pengelola, foto_pengelola from pengelola');
      const alamat = await query(`SELECT * from alamat_pengelola`)

      res.status(200).json({
         message : "GET all pengelola succes",
         data : data,
         alamat : alamat
      })
   } catch (error) {
      res.status(500).json({
         message : "Server eror",
         serverMessage : error
   })
   }
}

const registerPengelola = async (req, res) => {
   const emailUser = req.user.email
      const idUser = req.user.userId
      const dataUser = await query(`SELECT * FROM users WHERE email='${emailUser}'`)
      const fullname = dataUser[0].fullname
      const pengelolaToken = jwt.sign({idUser, emailUser}, `${process.env.PENGELOLA_TOKEN_TOKEN}`)
      const {body} = req
   try {
   
      const dataPengelola = await pengelolaModel.addProfilePengelola(body, fullname, idUser, pengelolaToken)
      const idPengelola = dataPengelola.insertId
      await pengelolaModel.addAlamatPengelola(body, idPengelola)

      res.status(201).json({
         message : "Anda berhasil mendaftar sebagai pengelola",
         data : body
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message : "Data Anda Kurang"
      })
   }
}

const loginPengelola = async (req, res, next) => {
   try {
      const {body} = req
      const user = await usersModel.getEmailUser(body)

      const match = await bcrypt.compare(req.body.password, user[0].password)

      if(!match) return res.status(400).json({
         message : "password anda salah"
      })
      
      const userId = user[0].id_user
      const dataPengelola = await query(`SELECT * FROM pengelola WHERE id_users='${userId}'`)
      const pengelolaToken = dataPengelola[0].token_pengelola

      if(pengelolaToken) return res.json({
         message: "Anda login dengan akun pengelola"
      })
      next()
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message : "email tidak ditemukan",
      })
   }
}

// const logout = async (req, res) => {
//    const userId = req.user.userId

//    await usersModel.tokenUsers({
//       refresh_token : null
//    }, userId)

//    res.json({
//       message : "anda telah logout"
//    })
// }

module.exports = {
   getAllPengelola,
   registerPengelola,
   loginPengelola
}