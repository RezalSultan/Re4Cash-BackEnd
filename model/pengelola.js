const {query} = require("../config/query");

const pengelolaTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'pengelola'`);
      if (checkTable.length === 0) {
         await query(`
         CREATE TABLE pengelola (
            id_pengelola INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
            id_users INT NOT NULL PRIMARY KEY UNIQUE,
            CONSTRAINT fk_id_users FOREIGN KEY (id_users) REFERENCES users (id_user),
            fullname_users CHAR(255),
            CONSTRAINT fk_fullname FOREIGN KEY (fullname_users) REFERENCES users (fullname) ON DELETE CASCADE ON UPDATE CASCADE,
            nama_pengelola VARCHAR(255) DEFAULT NULL,
            no_hp_pengelola VARCHAR(15) DEFAULT NULL,
            no_rekening VARCHAR(30) DEFAULT NULL,
            email_pengelola VARCHAR(100) UNIQUE DEFAULT NULL,
            foto_pengelola VARCHAR(255) DEFAULT NULL,
            token_pengelola CHAR(255) DEFAULT NULL
         );
         `);
      }
   } catch (error) {
      console.log("users tabel " + error);
   };
};

const addProfilePengelola = async (body, fullname, idUser, pengelolaToken) => {
   try {
      const sql = await query(`INSERT INTO pengelola (id_users, fullname_users, nama_pengelola, no_hp_pengelola, no_rekening, email_pengelola, token_pengelola) VALUES (${idUser}, '${fullname}', '${body.nama_pengelola}', '${body.no_hp_pengelola}', '${body.no_rekening}', '${body.email_pengelola}', '${pengelolaToken}')`)

      return sql;
   } catch (error) {
      console.log("model user " + error);
   }
}

const addAlamatPengelola = async (body, idPengelola) => {
   try {
      const sql = await query(`INSERT INTO alamat_pengelola (id_pengelola, provinsi, kabupaten_kota, kecamatan, kode_pos, alamat_lengkap) VALUES (${idPengelola},'${body.provinsi}', '${body.kabupaten_kota}', '${body.kecamatan}', ${body.kode_pos}, '${body.alamat_lengkap}')`)

      return sql;
   } catch (error) {
      console.log("model user " + error);
   }
}

module.exports = {
   pengelolaTbl,
   addProfilePengelola,
   addAlamatPengelola
}