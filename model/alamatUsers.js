const {query} = require("../config/query");

const alamatUsersTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'alamat_user'`)
      if (checkTable.length === 0){
         await query(`
           CREATE TABLE alamat_user (
               id_alamat_user INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
               id_user INT NOT NULL,
               FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE,
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

const getAlamatUsers = async () => {
   try {
      const sql = await query(`SELECT * from alamat_user`)

      return sql;
   } catch (error) {
      console.log("model" + error);
   }
}


const getAlamatUsersById = async (idUser) => {
   try {
      const sql = await query(`SELECT id_alamat_user, provinsi, kabupaten_kota, kecamatan, kode_pos, alamat_lengkap from alamat_user WHERE id_user=${idUser}`)

      return sql;
   } catch (error) {
      console.log("model" + error);
   }
}

const addAlamatUsers = async (body, idUser) => {
   try {
      const sql = await query(`INSERT INTO alamat_user (id_user, provinsi, kabupaten_kota, kecamatan, kode_pos, alamat_lengkap) VALUES (${idUser}, '${body.provinsi}', '${body.kabupaten_kota}', '${body.kecamatan}', ${body.kode_pos}, '${body.alamat_lengkap}') `)

      return sql;
   } catch (error) {
      console.log("model" + error);
   }
}

const updateAlamatUsers = async (body, idUser, idAlamatUser) => {
   try {
      const sql = await query(`UPDATE alamat_user SET provinsi='${body.provinsi}', kabupaten_kota='${body.kabupaten_kota}', kecamatan='${body.kecamatan}', kode_pos=${body.kode_pos}, alamat_lengkap='${body.alamat_lengkap}' WHERE id_user=${idUser} AND id_alamat_user=${idAlamatUser}`)

      return sql;
   } catch (error) {
      console.log("model" + error);
   }
}

const deleteAlamatUsers = async (idUser, idAlamatUser) => {
   try {
      const sql = await query(`DELETE FROM alamat_user WHERE id_user=${idUser} AND id_alamat_user=${idAlamatUser}`)

      return sql;
   } catch (error) {
      console.log("model" + error);
   }
}

module.exports = {
   alamatUsersTbl,
   getAlamatUsers,
   getAlamatUsersById,
   addAlamatUsers,
   updateAlamatUsers,
   deleteAlamatUsers
}