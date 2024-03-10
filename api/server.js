// Add express in our project 
var express = require('express'); 
const cors = require('cors');
// Creating the express app 
var app = express(); 
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended:false})) 
// The requirement of this package is 
// in the later part of the application 

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
    console.log("body", req.body)

    var itemSelectedFromDropdown = req.body.stockSelected; 
    axios.request(options).then(function (response) { 

            var dataFromResponse = response.data; 
            for(var i = 0; i<dataFromResponse.length; i++){ 
            if(dataFromResponse[i].symbol == itemSelectedFromDropdown){ 
                    
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

    
    
// app.get("/data_2",(req,res)=>{
//     res.json(dataOfStock)
// })





// WE ARE MAKING A SIMPLE GET REQUEST ON HOME ROUTE 
// JUST TO MAKE SURE THAT EVERYTHING IS GOING FINE. 

app.get("/", function(req, res) { 

    res.sendFile(__dirname + "/index.html"); 
// res.send("We are getting a get request on home(/) route.") 
}) 



// A SIMPLE POST REQUEST ON /DATA ROUTE. 
// WE WILL USE THIS IN A WHILE. 
app.post("/data", function(req, res) { 
res.send("We have got the post request on /data route"); 
}) 

// WE ARE ALLOWING OUR APP TO LISTEN ON PORT 3000 
var port = 4500; 
app.listen(port, function() { 
console.log("Server started successfully at port "+port); 
})












// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://latest-stock-price.p.rapidapi.com/price',
//   params: {
//     Indices: 'NIFTY 50'
//   },
//   headers: {
//     'X-RapidAPI-Key': '67e63e8089msh450e0c700daabd7p17e0b9jsn3e27fb322d83',
//     'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
//   }
// };

// abc =async ()=>{
// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
// }

// abc()