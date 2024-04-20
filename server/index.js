const express = require("express")

const { generateFile} = require('./generateFile.js')

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.json("hello")
})

app.listen(5000,()=>{
    console.log("Ap running")
})

app.post("/run", async (req,res)=>{
    const {language="cpp", code}= req.body
    if(code===undefined){
        return res.status(400).json({success:false,error:"Code is Empty"})
    }

    const filepath = await generateFile(language,code)
    return res.json({filepath});
})