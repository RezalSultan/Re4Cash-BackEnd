const {usersTbl} = require("../model/users")
const {alamatUsersTbl} = require("../model/alamatUsers")
const {artikelTbl} = require("../model/artikel")
const {pengelolaTbl} = require("../model/pengelola")
const {alamatPengelolaTbl} = require("../model/alamatPengelola")

module.exports = {
   executeTbl:async () => {
      try {
         await usersTbl() ;
         await alamatUsersTbl() ;
         await artikelTbl() ;
         await pengelolaTbl() ;
         await alamatPengelolaTbl() ;
      } catch (error) {
         console.log(error);
      }
   }
}