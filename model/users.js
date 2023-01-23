const {query} = require("../config/query");

// const usersTbl = async () => {
//    try {
//       const checkTable = await query(`DROP TABLE users`);
//       return checkTable
//    } catch (error) {
//       console.log("users tabel " + eorro);
//    };
// };

const usersTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'users'`);
      if (checkTable.length === 0) {
         await query(`
         CREATE TABLE users (
            id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password CHAR(100) NOT NULL,
            fullname CHAR(100) KEY DEFAULT NULL,
            gender ENUM("Laki-Laki", "Perempuan") DEFAULT NULL,
            tgl_lahir DATE DEFAULT NULL,
            no_hp CHAR(15) DEFAULT NULL,
            foto_user VARCHAR(255) DEFAULT NULL,
            refresh_token CHAR(255) DEFAULT NULL
         );
         `);
      }
   } catch (error) {
      console.log("users tabel " + error);
   };
};

const getAllUsers = async () => {
   try {
      const sql = await query(`SELECT id_user, email, fullname, gender, tgl_lahir, no_hp, password from users`)

      return sql;
   } catch (error) {
      console.log("model" + error);
   }
}

const getUsersById = async (userId) => {
   try {
      const sql = await query(`SELECT id_user, email, fullname, gender, tgl_lahir, no_hp, password from users WHERE id_user=${userId}`)

      return sql;
   } catch (error) {
      console.log("model" + error);
   }
}

const getEmailUser = async (body) => {
   try {
      const sql = await query(`SELECT * from users WHERE email="${body.email}"`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const register = async (body) => {
   try {
      const sql = await query(`INSERT INTO users (fullname, email, password) VALUES ('${body.fullname}', '${body.email}', '${body.password}')`)

      return sql;
   } catch (error) {
      console.log("model user " + error);
   }
}

const tokenUsers = async (body, id_user) => {
   try {
      const sql = await query(`UPDATE users SET refresh_token='${body.refresh_token}' WHERE id_user=${id_user}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const addPhotoUsers = async (body, idUser) => {
   try {
      const sql = await query(`UPDATE users SET foto_user ='${body.foto_user}' WHERE id_user=${idUser}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const getPhotoUsers = async (idUser) => {
   try {
      const sql = await query(`SELECT foto_user from users WHERE id_user=${idUser}`)
      // const sql = await query(`UPDATE users SET foto_user = NULL WHERE id_user=${idUser}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const deletePhotoUsers = async (idUser) => {
   try {
      const sql = await query(`UPDATE users SET foto_user = NULL WHERE id_user=${idUser}`)
      // const sql = await query(`UPDATE users SET foto_user = NULL WHERE id_user=${idUser}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}

const updateUsers = async (body, id) => {
   try {
      const sql = await query(`UPDATE users SET fullname='${body.fullname}', gender='${body.gender}',  tgl_lahir='${body.tgl_lahir}', email='${body.email}', no_hp='${body.no_hp}' WHERE id_user=${id}`)

      return sql;
   } catch (error) {
      console.log("model " + error);
   }
}


module.exports = {
   usersTbl,
   getAllUsers,
   getUsersById,
   register,
   tokenUsers,
   getEmailUser,
   addPhotoUsers,
   getPhotoUsers,
   deletePhotoUsers,
   updateUsers
};