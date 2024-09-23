const express = require("express");
const pool = require("./db");
const app = express();
app.use(express.json());


app.get("/hello", (req, res) => {
    res.send("Hello World");
})
app.get("/",  async(req, res) => {
    try{
        const result = await pool.query("SELECT * FROM schools");
        res.status(200).send({data: result.rows});
    }
    catch(err){
        console.log(err.message);
    }
})

app.post('/', async (req, res) => {
    const { name, address } = req.body;
    try{
        const result = await pool.query("INSERT INTO schools(name, address) VALUES($1, $2)", [name, address]);
        res.status(200).send({message: "row added"});
    }
    catch(err){
        console.log(err.message);
    }
})

app.get('/setup',async (req, res) => {  
    try{
        const result = await pool.query("CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100) );");
        res.status(200).send({message: "table created"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err});
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})