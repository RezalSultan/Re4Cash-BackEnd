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
            fullname_users CHAR(100),
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

const addProfilePengelola = async (body, fullname, idUser) => {
   try {
      const sql = await query(`INSERT INTO pengelola (id_users, fullname_users, nama_pengelola, no_hp_pengelola, no_rekening, email_pengelola) VALUES (${idUser}, '${fullname}', '${body.nama_pengelola}', '${body.no_hp_pengelola}', '${body.no_rekening}', '${body.email_pengelola}')`)

      return sql;
   } catch (error) {
      console.log("model user " + error);
   }
}

const updateProfilePengelola = async (body, idPengelola) => {
   try {
      const sql = await query(`UPDATE pengelola p JOIN users u ON p.fullname_users = u.fullname SET p.fullname_users = '${body.fullname_users}', p.nama_pengelola='${body.nama_pengelola}',  p.no_hp_pengelola='${body.no_hp_pengelola}', p.no_rekening='${body.no_rekening}', p.email_pengelola='${body.email_pengelola}' WHERE id_pengelola=${idPengelola}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const tokenPengelola = async (body, id_pengelola) => {
   try {
      const sql = await query(`UPDATE pengelola SET token_pengelola='${body.token_pengelola}' WHERE id_pengelola=${id_pengelola}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const addPhotoPengelola = async (body, pengelolaId) => {
   try {
      const sql = await query(`UPDATE pengelola SET foto_pengelola ='${body.foto_pengelola}' WHERE id_pengelola=${pengelolaId}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const getPhotoPengelola = async (pengelolaId) => {
   try {
      const sql = await query(`SELECT foto_pengelola from pengelola WHERE id_pengelola=${pengelolaId}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const deletePhotoPengelola = async (pengelolaId) => {
   try {
      const sql = await query(`UPDATE pengelola SET foto_pengelola = NULL WHERE id_pengelola=${pengelolaId}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}


module.exports = {
   pengelolaTbl,
   addProfilePengelola,
   updateProfilePengelola,
   tokenPengelola,
   addPhotoPengelola,
   getPhotoPengelola,
   deletePhotoPengelola
}