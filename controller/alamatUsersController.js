const usersModel = require("../model/users")
const alamatUsersModel = require("../model/alamatUsers")

const tampilAlamatUsers = async (req, res) => {
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
      const refreshToken = req.cookies.refreshToken
      const user = await usersModel.getTokenUser({
         refresh_token : refreshToken
      })
      const idUserAuth = parseInt(user[0].id_user)
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
      const refreshToken = req.cookies.refreshToken
      const user = await usersModel.getTokenUser({
         refresh_token : refreshToken
      })
      const idUser = user[0].id_user

      const {body} = req
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
      const refreshToken = req.cookies.refreshToken
      const user = await usersModel.getTokenUser({
         refresh_token : refreshToken
      })

      const idUser = user[0].id_user
      const {idAlamatUser} = req.params
      const {body} = req

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
      const refreshToken = req.cookies.refreshToken
      const user = await usersModel.getTokenUser({
         refresh_token : refreshToken
      })
      const idUser = user[0].id_user

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