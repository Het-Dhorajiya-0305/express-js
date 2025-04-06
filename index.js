import http from 'http';
import express from 'express';

const app = express();

app.get("/",(req,res)=>{
    return res.send("Hello World");
})
app.get("/about",(req,res)=>{
    return res.send("Hello World from het dhorajiya");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})