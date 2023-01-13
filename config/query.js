const {db} = require("./database");

module.exports = {
   query: async (query) => {
      try {
         const [executeQuery] = await db.query(query);
         return executeQuery;
      }catch (error) {
         console.log("connection: " + error)
      }
   },
}