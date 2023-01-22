const usersModel = require("../model/users")
const fs = require("fs")
const {query} = require("../config/query");

const validationPhotoUsers = (req, res, next) => {
   const { activityName, activityDescription } = req.body;
   try {

     if (req.file === undefined) return res.status(400).json("Image required!");
 
     if (activityName === "") return res.status(400).json("Activity name required!");

     if (activityDescription === "") return res.status(400).json("Activity description required!");
 
     next();
   } catch (error) {
     return res.status(400).json("Something went wrong!");
   }
};

const uploadPhotoUsers = async (req, res) => {
   const id_user = req.user.userId
   const body = req.file.filename

   try {
      await usersModel.addPhotoUsers({
         foto_user: body
      }, id_user)

      res.status(201).json({
         message: "Upload berhasil",
         data : {
            foto_user : body
         }
      })
   } catch (error) {
      return res.status(400).json("Upload gagal");
   }
}

const updatePhotoUsers = async (req, res) => {
   const id_user = req.user.userId
   const body = req.file.filename
   const photoUser = await query(`SELECT foto_user FROM users WHERE id_user=${id_user}`)
   const photo = photoUser[0].foto_user

   if(!photo) return res.status(404).json({
      message : "Photo Not Found"
   })

   try {
      const filepath = `./public/images/users/${photo}`
      fs.unlinkSync(filepath)

      await usersModel.addPhotoUsers({
         foto_user: body
      }, id_user)

      res.status(201).json({
         message: "Update berhasil",
         data : {
            foto_user : body
         }
      })
   } catch (error) {
      return res.status(400).json("Update gagal");
   }
}

const deletePhotoUsers = async (req, res) => {
   const id_user = req.user.userId
   const userPhoto = await usersModel.getPhotoUsers(id_user)
   const photo = userPhoto[0].foto_user
   if(!photo) return res.status(404).json({
      message: "Not Data Found"
   })

   try {
      const filepath = `./public/images/users/${photo}`
      fs.unlinkSync(filepath)
       await usersModel.deletePhotoUsers(id_user)

       res.status(200).json({
         message: "Foto telah terhapus"
      })
   } catch (error) {
      console.log(error.message)
   }
}

module.exports = {
   uploadPhotoUsers,
   validationPhotoUsers,
   updatePhotoUsers,
   deletePhotoUsers
}