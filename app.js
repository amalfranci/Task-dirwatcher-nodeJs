const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/database.js");
const bodyParser = require("body-parser");
const path = require('path')
const morgan =require('morgan')
const taskRoutes = require("./Routes/taskRoutes.js");
const logger = require("./utils/logger.js");
const cors  =require('cors')



const app = express();

const port = process.env.PORT || 3000;
app.use(cors({
  origin: ["http://localhost:3001"],
  credentials:true
}))

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "views/build")));

app.use("/api/tasks", taskRoutes);
app.get('*',(req,res)=>{
   res.sendFile(path.join(__dirname,"views/build/index.html"))
})
app.use(morgan("combined", { stream: logger.stream }));

app.listen(port, () => {
  console.log("Server Connect on port", { http: "http://localhost:" + port });
});
