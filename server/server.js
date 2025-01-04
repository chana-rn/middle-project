require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const PORT=process.env.PORT || 7100
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("this is the home page")
})

app.use("/api/todo",require("./routes/todos"))
app.use("/api/user",require("./routes/users"))
app.use("/api/post",require("./routes/posts"))

mongoose.connection.once('open',()=>{
    console.log('connected to DATABASE')
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error',err=>console.log(err))