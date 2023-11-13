const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config({ path: "./config/.env" });
const connect=require('./config/database.js')
connect();

app.listen(process.env.PORT, () => {
    console.log("server is listening on port", process.env.PORT);
})