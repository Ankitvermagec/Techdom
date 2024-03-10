const express = require("express")
const app =  express()
var bodyParser = require('body-parser')
const  connection = require("./server")
var cors = require('cors')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());
// where we will have to fetch data from server 
var axios = require("axios").default; 

const options = {
  method: 'GET',
  url: 'https://latest-stock-price.p.rapidapi.com/price',
  params: {
    Indices: 'NIFTY 50'
  },
  headers: {
    'X-RapidAPI-Key': '67e63e8089msh450e0c700daabd7p17e0b9jsn3e27fb322d83',
    'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
  }
};




// EVERYTHING EXCEPT THE POST REQUEST 
// SECTION IS SAME AS EARLIER. 
// HANDLING THE POST REQUEST ON /DATA ROUTE. 
app.post("/data", function(req, res) { 
    console.log("body: ", req.body)

    var itemSelectedFromDropdown = req.body.stockSelected; 
    axios.request(options).then(function (response) { 
        console.log("response.data: ",response.data)
            var dataFromResponse = response.data; 
            for(var i = 0; i<dataFromResponse.length; i++)
            { 
                if(dataFromResponse[i].symbol == itemSelectedFromDropdown)
                {                    
                    var dataOfStock = dataFromResponse[i]; 
                    res.send("<html><body> <h1><strong> " + dataOfStock.symbol + "</strong></h1>"+ 
                    "<h1> Open: " + dataOfStock.open + "</h1>" + 
                    "<h1> Day High: "+ dataOfStock.dayHigh + "</h1>" + 
                    "<h1> Day Low: "+ dataOfStock.dayLow + "</h1>" + 
                    "<h1> Last Price: "+ dataOfStock.lastPrice + "</h1>" + 
                    "<h1> Previous Close: "+ dataOfStock.previousClose + "</h1>" + 
                    "<h1> Year Low: "+ dataOfStock.yearHigh + "</h1>" + 
                    "<h1> Year Low: "+ dataOfStock.yearLow + "</h1>" + 
                    "<h1> Last Update Time: "+ dataOfStock.lastUpdateTime + "</h1>" + 

                    "</body></html>") 
                    // res.json(dataOfStock)
                } 
            } 
    
    }).catch(function (error) { 
    console.error(error) 
    res.json({message: "Error: ", error})
    }); 
}); 

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



