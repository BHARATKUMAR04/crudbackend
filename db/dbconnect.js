const{connect} = require("mongoose");

const connectionDB = async()=>{
    try {
        const conn = await connect(process.env.DB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
}
module.exports =connectionDB;