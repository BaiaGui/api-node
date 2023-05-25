const express = require('express');
//const cors = require("cors")
const app = express();

app.use(express.json());
//app.use(cors());
app.listen( process.env.PORT ||  3000);


app.get('/', function(req, res){
    console.log("Acessando /");
    res.send('Hello Mundo')});

/*
  Servidor propriamente dito
*/

const groups = [
    {id: 0, name: "Nome do grupo", members: []},
    {id: 1, name: "Outro nome do grupo", members: []}
]

const endpoint = "/groups";

app.get(endpoint, function(req, res){
    res.send(groups.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
    const id = req.params.id;
    const note = groups[id];

    if (!note){
        res.send("{}");
    } else {
        res.send(note);
    }   
});

app.post(endpoint, (req, res) => {
    const note = {
        id : groups.length,
        name : req.body["name"],
        members: req.body["members"]
    };
    groups.push(note);
    res.send("1");

});

app.put(`${endpoint}/:id`, (req, res) =>{
    const id = parseInt(req.params.id);
    const note = {
        id : id,
        name : req.body["name"],
        members: req.body["members"]
    };

    groups[id] = note;
    res.send("1");
});

app.delete(`${endpoint}/:id`, (req, res) => {
    const id = req.params.id;
    delete groups[id];
    res.send("1");

});