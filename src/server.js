require("dotenv/config")
require("express-async-errors")
const AppError = require("./utils/AppError")
const express = require("express")
const database = require("./database/sqlite")
const cors = require("cors")
const path = require("path");
const uploadConfig = require("./configs/upload");

const PORT = 3333;
const routes = require("./routes")
const app = express();
app.use(cors())

app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes)

database()

app.use((error, request, response, next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            "status":"error",
            "message":error.message
        })
    }
    return response.status(500).json({
        "status":"error",
        "message":"internar server error"
    })

})

app.listen(PORT, console.log(`
    server is running on port ${PORT}`))