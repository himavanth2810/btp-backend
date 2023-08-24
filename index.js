require("./configs/dotenv");
const express = require('express');
const cors = require('cors');
const {signIn, signUp} = require("./controllers/auth");
const client = require("./configs/db");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET}));


const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running');
});

app.use("/auth/signup",signUp);
app.use("/auth/signin",signIn);


client.connect((err) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to Database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on the port: ${port}`);
});
