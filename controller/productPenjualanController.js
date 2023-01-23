const {query} = require("../config/query");
const modelProductPenjualan = require("../model/productPenjualan")
const modelPhotoProductPenjualan = require("../model/photoProductPenjualan")

const lihatProductPenjualan = async (req, res) => {
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

const lihatProductPenjualanById = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   const {productId} = req.params
   try {
      const dataProductPenjualan = await query(`SELECT id_produk_penjualan, jenis_produk, nama_produk, CONCAT('Rp. ', FORMAT(harga, 2, 'id_ID')) AS harga, satuan, kategori, sub_kategori, stok_barang, distribusi FROM produk_penjualan WHERE id_pengelola=${pengelolaId} AND  id_produk_penjualan=${productId}`)
      const photoProduct = await query(`SELECT id_photo_produk, foto_produk FROM foto_produk_penjualan WHERE id_produk_penjualan=${productId}`)

      res.json({
         message : "sukses mengambil data produk penjualan",
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

const tambahProductPenjualan = async (req, res) => {
   
}

const updateProductPenjualan = async (req, res) => {
   
}

const hapusProductPenjualan = async (req, res) => {
   
}

module.exports = {
   lihatProductPenjualan,
   lihatProductPenjualanById,
   tambahProductPenjualan,
   updateProductPenjualan,
   hapusProductPenjualan
}