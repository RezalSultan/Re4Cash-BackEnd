const {query} = require("../config/query");
const modelProductPencarian = require("../model/productPencarian")
const modelPhotoProductPencarian = require("../model/photoProductPencarian")

const lihatProductPencarian = async (req, res) => {
   try {
      const dataProductPenjualan = await query(`SELECT id_produk_penjualan, id_pengelola, jenis_produk, nama_produk, CONCAT('Rp. ', FORMAT(harga, 2, 'id_ID')) AS harga, satuan, kategori, sub_kategori, stok_barang, distribusi FROM produk_penjualan`)
      const photoProduct = await query(`SELECT id_photo_produk, id_produk_penjualan, foto_produk FROM foto_produk_penjualan`)
      res.json({
         message : "sukses mengambil semua data produk penjualan",
         data : dataProductPenjualan, 
         foto: photoProduct
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message : "Server Error",
         serverMessage : error
      })
   }
}

const lihatProductPencarianById = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   const {productId} = req.params
   try {
      const dataProductPencarian = await query(`SELECT id_produk_pencarian, jenis_produk, nama_produk, CONCAT('Rp. ', FORMAT(harga, 2, 'id_ID')) AS harga, satuan, kategori, sub_kategori, stok_barang, distribusi FROM produk_pencarian WHERE id_pengelola=${pengelolaId} AND  id_produk_pencarian=${productId}`)
      const photoProduct = await query(`SELECT id_photo_produk, foto_produk FROM foto_produk_pencarian WHERE id_produk_pencarian=${productId}`)

      res.json({
         message : "sukses mengambil data produk pencarian",
         data : dataProductPencarian,
         foto: photoProduct
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message : "Server Error",
         serverMessage : error
      })
   }
}

const tambahProductPencarian = async (req, res) => {
   
}

const updateProductPencarian = async (req, res) => {
   
}

const hapusProductPencarian = async (req, res) => {
   
}

module.exports = {
   lihatProductPencarian,
   lihatProductPencarianById,
   tambahProductPencarian,
   updateProductPencarian,
   hapusProductPencarian
}