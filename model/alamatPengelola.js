const {query} = require("../config/query");

const alamatPengelolaTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'alamat_pengelola'`)
      if (checkTable.length === 0){
         await query(`
           CREATE TABLE alamat_pengelola (
               id_alamat_pengelola INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
               id_pengelola INT NOT NULL,
               CONSTRAINT fk_id_pengelola FOREIGN KEY (id_pengelola) REFERENCES pengelola (id_pengelola) ON DELETE CASCADE,
               provinsi VARCHAR(255) DEFAULT NULL,
               kabupaten_kota VARCHAR(255) DEFAULT NULL,
               kecamatan VARCHAR(255) DEFAULT NULL,
               kode_pos INT(15) DEFAULT NULL,
               alamat_lengkap TEXT(255) DEFAULT NULL
           );
         `)
      }
   } catch (error) {
      console.log("alamat users tabel " + error);
   }
}

module.exports = {
   alamatPengelolaTbl
}