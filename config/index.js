const {usersTbl} = require("../model/users")
const {alamatUsersTbl} = require("../model/alamatUsers")

module.exports = {
   executeTbl:async () => {
      try {
         await usersTbl() ;
         await alamatUsersTbl() ;
      } catch (error) {
         console.log(error);
      }
   }
}