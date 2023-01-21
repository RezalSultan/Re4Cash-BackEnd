// membuat fungsi yang akan diambil oleh routes nya
const usersModel = require("../model/users")
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
   try {
      const data = await usersModel.getAllUsers();

      res.status(200).json({
         message : "GET all users succes",
         data : data
      })
   } catch (error) {
      res.status(500).json({
         message : "Server eror",
         serverMessage : error
   })
   }
}

const register = async (req, res) => {
   const {fullname, email, password, confirm_password } = req.body
   const {body} = req

   if(password !== confirm_password) return res.status.json({message : "password tidak cocok"})

   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(password, salt)
   
   try {
      await usersModel.register({
         fullname : fullname,
         email : email,
         password : hashPassword
      })

      res.status(201).json({
         message : "Anda berhasil mendaftar berhasil",
         data : body
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message : "Server eror"
      })
   }
}

const updateUser = async (req,res) => {
   const id_user = req.user.userId
   const {body} = req
   try {
      await usersModel.updateUsers(body, id_user)

      res.status(201).json({
         message : "UPDATE users succes",
         data : {
            id_user : id_user,
            ...body
         }
      })
   } catch (error) {
      res.status(500).json({
         message : "Server eror",
         serverMessage : error
      })
   }
}

module.exports = {
   getAllUsers,
   register,
   updateUser
}