const usersModel = require("../model/users")
const alamatUsersModel = require("../model/alamatUsers")

const tampilAlamatUsers = async (req, res) => {
   console.log(req.user);
   
   try {
      const alamat = await alamatUsersModel.getAlamatUsers()

      res.json({
         message : "Data alamat berhasil ditampilkan",
         data : alamat
      })
   } catch (error) {
      console.log(error)
   }
}

const tampilAlamatUsersById = async (req, res) => {
   try {
      const idUserAuth = parseInt(req.user.userId)
      const {idParams} = req.params
      const idUser = idUserAuth == idParams ? idUserAuth : null

      if(idUser !== idUserAuth) return res.status(404).json({
         message : "User ini belum login"
      })

      const alamat = await alamatUsersModel.getAlamatUsersById(idUser)

      if(alamat.id_user === null) return res.status(404).json({
         message : "Data alamat maasih kosong"
      })

      res.json({
         message : "Data alamat berhasil ditampilkan",
         data : alamat
      })
   } catch (error) {
      console.log(error)
   }
}

const tambahAlamatUsers = async (req, res) => {
   try {
      const idUser = req.user.userId
      const alamat = await alamatUsersModel.addAlamatUsers(body, idUser)

      res.json({
         message : "Data alamat berhasil ditambah",
         data : alamat
      })
   } catch (error) {
      console.log(error)
   }
}

const editAlamatUsers = async (req, res) => {
   try {
      const idUser = req.user.userId
      const {idAlamatUser} = req.params
      const alamat = await alamatUsersModel.updateAlamatUsers(body, idUser, idAlamatUser)

      res.json({
         message : "Data alamat berhasil diupdate",
         data : alamat
      })
   } catch (error) {
      console.log(error)
   }
}

const hapusAlamatUsers = async (req, res) => {
   try {
      const idUser = req.user.userId
      const {idAlamatUser} = req.params
      await alamatUsersModel.deleteAlamatUsers(idUser, idAlamatUser)

      res.json({
         message : "Data alamat berhasil dihapus"
      })
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   tampilAlamatUsersById,
   tampilAlamatUsers,
   tambahAlamatUsers,
   editAlamatUsers,
   hapusAlamatUsers
}