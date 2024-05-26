const express = require('express')
require('dotenv').config()
const connectDB = require('./utils/database.js')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const taskRoutes = require('./Routes/taskRoutes.js')
const logger = require('./utils/logger.js')



const app = express();
const port = process.env.PORT || 3000; 

connectDB();

app.use(bodyParser.json())
app.use('/api/tasks',taskRoutes)

app.use(morgan('combined',{stream:logger.stream}))

app.listen(port, () => {
    
   console.log("Server Connect on port", { http: 'http://localhost:' + port });
})