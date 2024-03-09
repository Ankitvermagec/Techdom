const express = require("express")
const app =  express()
var bodyParser = require('body-parser')
const  connection = require("./server")
var cors = require('cors')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.post("/insert",(req,res)=>{
    console.log(req.body)
    const email=req.body.email
    const pass=req.body.password

    connection.connect("insert into stock_user(email,password)  values(?,?)",[email,pass],(err,data)=>{
        res.json(data)
    })
})


app.post("/login",(req,res)=>{
    const email=req.body.email
    const pass=req.body.password

    connection.connect("select * from stock_user where email=? and password=?",[email,pass],(err,data)=>{
        res.json(data)
    })
})


app.listen(3500,(err)=>{
    console.log("connected....!")
})



