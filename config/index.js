const {usersTbl} = require("../model/users")

module.exports = {
   executeTbl:async () => {
      try {
         await usersTbl() ;
      } catch (error) {
         console.log(error);
      }
   }
}