const express = require("express");
const app = express();
const fs = require("fs")
var contacts = require("./crudfile.json");
var bodyParser = require("body-parser")
app.use(bodyParser.json())

// read data
app.get("/api", (req, res) => {
    res.json(contacts);
});

// to add new data
app.post("/api/create",(req,res)=> { 
    var obj = {
        name: req.body.name,
        Email: req.body.Email,
        password: req.body.password
    }
    
    var data = fs.readFileSync("crudfile.json")
        data = data.toString();
        var Data = JSON.parse(data)
        


    obj.id = Data.length + 1
    Data.push(obj)
    fs.writeFileSync("crudfile.json",JSON.stringify(Data,null,2))
    return res.json(Data)

});

// update the data
app.put('/update/:id', (req, res) => {

    var data = fs.readFileSync("crudfile.json")
    data = data.toString();
    var Data = JSON.parse(data)


    for (var i=0;i<Data.length;i++){
        if(Data[i]["id"]==req.params.id){
            Data[i]["name"]=req.body.name,
            Data[i]["Email"] = req.body.Email,
            Data[i]["password"] = req.body.password
            

            fs.writeFileSync("crudfile.json",JSON.stringify(Data,null,2))
            return res.json(Data)
        }
    }
});

// delete  the data
app.delete('/delete/:id', (req, res) => {

    var data = fs.readFileSync("crudfile.json")
    data = data.toString();
    var Data = JSON.parse(data)

    for (var i=0;i<Data.length;i++){
        if(Data[i]["id"]==req.params.id){
            
        delete Data[i]["name"]
        delete Data[i]["Email"]
        delete Data[i]["password"]
            

            fs.writeFileSync("crudfile.json",JSON.stringify(Data,null,2))
            return res.json(Data)
        }
    }
});


// server 
app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});
  