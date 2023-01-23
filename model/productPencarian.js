const {query} = require("../config/query");

const productPencarianTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'produk_pencarian'`);
      if (checkTable.length === 0) {
         await query(`
         CREATE TABLE produk_pencarian (
            id_produk_pencarian INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
            id_pengelola INT NOT NULL,
            CONSTRAINT fk_id_pengelola_pc FOREIGN KEY (id_pengelola) REFERENCES pengelola (id_pengelola),
            jenis_produk ENUM("Daur Ulang", "Mentahan") DEFAULT NULL,
            nama_produk VARCHAR(100) DEFAULT NULL,
            harga CHAR(50) DEFAULT NULL,
            satuan ENUM("Kg", "Pcs") DEFAULT NULL,
            kategori ENUM("Organik", "Anorganik") DEFAULT NULL,
            sub_kategori VARCHAR(100) DEFAULT NULL,
            stok_barang INT(15) DEFAULT NULL,
            menabung ENUM("tersedia", "tidak tersedia") DEFAULT NULL,
            distribusi ENUM("Kami Antar", "Ambil Sendiri", "Kurir" ) DEFAULT NULL
         );
         `);
      }
   } catch (error) {
      console.log("produk_pencarian tabel " + error);
   };
};

module.exports = {
   productPencarianTbl
}