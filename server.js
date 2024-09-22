const express = require('express');
const dotenv = require('dotenv');
//chargé les variables
dotenv.config();
const app = express();
const port = process.env.PORT;

app.get('/api/contact', (req, res) => {
    res.json({message:"get all contacts"});
})
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})