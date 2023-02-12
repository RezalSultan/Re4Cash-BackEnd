const {usersTbl} = require("../model/users")
const {alamatUsersTbl} = require("../model/alamatUsers")
const {artikelTbl} = require("../model/artikel")

module.exports = {
   executeTbl:async () => {
      try {
         await usersTbl() ;
         await alamatUsersTbl() ;
         await artikelTbl() ;
      } catch (error) {
         console.log(error);
      }
   }
}