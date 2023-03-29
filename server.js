const express =  require ('express');

const app= express();

require('dotenv').config();


const connectDB = require('./config/connectdDB');
connectDB();

 app.use("api/user",require('./routes/user-routes'))

const PORT = process.env.PORT;



app.listen(PORT,error => {
    error? console.error(`server failed to run !!! ${error}`):
    console.log(`server is runnig on port ${PORT}`);
});
