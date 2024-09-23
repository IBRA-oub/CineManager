const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require('./config/db')
dotenv.config();
connectDB();
const app = express();


app.use(express.json());
app.use(errorHandler);
const usersRouter = require('./routes/usersRoutes');


app.use('/', usersRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})