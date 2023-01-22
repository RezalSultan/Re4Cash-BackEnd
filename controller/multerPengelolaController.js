const pengelolaModel = require("../model/pengelola")
const fs = require("fs")
const {query} = require("../config/query");

const validationPhotoPengelola = (req, res, next) => {
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

const uploadPhotoPengelola = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   const body = req.file.filename

   try {
      await pengelolaModel.addPhotoPengelola({
         foto_pengelola: body
      }, pengelolaId)

      res.status(201).json({
         message: "Upload berhasil",
         data : {
            foto_pengelola : body
         }
      })
   } catch (error) {
      return res.status(400).json("Upload gagal");
   }
}

const updatePhotoPengelola = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   const body = req.file.filename
   const photoPengelola = await query(`SELECT foto_pengelola FROM pengelola WHERE id_pengelola=${pengelolaId}`)
   const photo = photoPengelola[0].foto_pengelola

   if(!photo) return res.status(404).json({
      message : "Photo Not Found"
   })

   try {
      const filepath = `./public/images/pengelola/${photo}`
      fs.unlinkSync(filepath)

      await pengelolaModel.addPhotoPengelola({
         foto_pengelola: body
      }, pengelolaId)

      res.status(201).json({
         message: "Update berhasil",
         data : {
            foto_pengelola : body
         }
      })
   } catch (error) {
      return res.status(400).json("Update gagal");
   }
}

const deletePhotoPengelola = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   const pengelolaPhoto = await pengelolaModel.getPhotoPengelola(pengelolaId)
   const photo = pengelolaPhoto[0].foto_pengelola
   if(!photo) return res.status(404).json({
      message: "Not Data Found"
   })

   try {
      const filepath = `./public/images/pengelola/${photo}`
      fs.unlinkSync(filepath)
       await pengelolaModel.deletePhotoPengelola(pengelolaId)

       res.status(200).json({
         message: "Foto telah terhapus"
      })
   } catch (error) {
      console.log(error.message)
   }
}

module.exports = {
   uploadPhotoPengelola,
   validationPhotoPengelola,
   updatePhotoPengelola,
   deletePhotoPengelola
}