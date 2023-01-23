const {query} = require("../config/query");

const productPenjualanTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'produk_penjualan'`);
      if (checkTable.length === 0) {
         await query(`
         CREATE TABLE produk_penjualan (
            id_produk_penjualan INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
            id_pengelola INT NOT NULL,
            CONSTRAINT fk_id_pengelola_pj FOREIGN KEY (id_pengelola) REFERENCES pengelola (id_pengelola),
            jenis_produk ENUM("Daur Ulang", "Mentahan") DEFAULT NULL,
            nama_produk VARCHAR(100) DEFAULT NULL,
            harga CHAR(50) DEFAULT NULL,
            satuan ENUM("Kg", "Pcs") DEFAULT NULL,
            kategori ENUM("Organik", "Anorganik") DEFAULT NULL,
            sub_kategori VARCHAR(100) NOT NULL,
            stok_barang INT(15) DEFAULT NULL,
            distribusi ENUM("Kami Antar", "Ambil Sendiri", "Kurir" ) DEFAULT NULL
         );
         `);
      }
   } catch (error) {
      console.log("produk_penjualan tabel " + error);
   };
};

module.exports = {
   productPenjualanTbl
}