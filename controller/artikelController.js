const artikelModel = require("../model/artikel")

const tampilArtikel = async (req, res) => {
   try {
      const artikel = await artikelModel.getArtikel()

      res.json({
         message : "Data artikel berhasil ditampilkan",
         data : artikel
      })
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   tampilArtikel
}