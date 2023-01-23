const {usersTbl} = require("../model/users")
const {alamatUsersTbl} = require("../model/alamatUsers")
const {artikelTbl} = require("../model/artikel")
const {pengelolaTbl} = require("../model/pengelola")
const {alamatPengelolaTbl} = require("../model/alamatPengelola")
const { productPencarianTbl } = require("../model/productPencarian")
const { photoProductPencarianTbl } = require("../model/photoProductPencarian")
const { productPenjualanTbl } = require("../model/productPenjualan")
const { photoProductPenjualanTbl } = require("../model/photoProductPenjualan")

module.exports = {
   executeTbl:async () => {
      try {
         await usersTbl() ;
         await alamatUsersTbl() ;
         await artikelTbl() ;
         await pengelolaTbl() ;
         await alamatPengelolaTbl() ;
         await productPencarianTbl();
         await photoProductPencarianTbl();
         await productPenjualanTbl();
         await photoProductPenjualanTbl();
      } catch (error) {
         console.log(error);
      }
   }
}