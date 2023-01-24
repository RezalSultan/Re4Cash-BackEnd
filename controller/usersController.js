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

const getUsersById = async (req, res) => {
   const userId = req.user.userId
   try {
      const userData = {};
      const listAddress= []
      const data = await usersModel.getUsersById(userId);
      if(data.length === 0) return res.status(400).json({message : "Invalid user!"})

      for (let i = 0; i < data.length; i++) {
         userData.id_user = data[0].id_user;
         userData.email = data[0].email;
         userData.fullname = data[0].fullname;
         userData.gender = data[0].gender;
         userData.tgl_lahir = data[0].tgl_lahir;
         userData.no_hp = +data[0].no_hp;
         listAddress.push({
            id_alamat_user : data[i].id_alamat_user, 
            provinsi: data[i].provinsi, 
            kabupaten_kota: data[i].kabupaten_kota,
            kecamatan: data[i].kecamatan,
            kode_pos : data[i].kode_pos,
            alamat_lengkap : data[i].alamat_lengkap
         })
      }
      userData.listAddress = listAddress;
      
      res.status(200).json({
         message : "GET all users succes",
         data : userData
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
   getUsersById,
   register,
   updateUser
}