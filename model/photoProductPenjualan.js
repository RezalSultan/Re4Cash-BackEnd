const {query} = require("../config/query");

const photoProductPenjualanTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'foto_produk_penjualan'`);
      if (checkTable.length === 0) {
         await query(`
         CREATE TABLE foto_produk_penjualan (
            id_photo_produk INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
            id_pengelola INT NOT NULL,
            CONSTRAINT fk_id_pengelola_penjualan FOREIGN KEY (id_pengelola) REFERENCES pengelola (id_pengelola),
            id_produk_penjualan INT NOT NULL,
            CONSTRAINT fk_id_produk_penjualan FOREIGN KEY (id_produk_penjualan) REFERENCES produk_penjualan (id_produk_penjualan) ON DELETE CASCADE ON UPDATE CASCADE,
            foto_produk VARCHAR(255) DEFAULT NULL
         );
         `);
      }
   } catch (error) {
      console.log("foto_produk_penjualan tabel " + error);
   };
};

module.exports = {
   photoProductPenjualanTbl
}