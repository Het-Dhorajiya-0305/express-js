import http from 'http';
import express from 'express';
import users from './MOCK_DATA.json' assert { type: 'json' };
import fs from 'fs';

const app = express();

app.use(express.urlencoded({ extended: false }))

app.get("/users", (req, res) => {
    return res.json(users);
})
app.get("/users/:userId", (req, res) => {
    const newUser = users.find((user) => user.id == req.params.userId)
    return res.json(newUser);
})
app.get("/about", (req, res) => {
    return res.send("Hello World from het dhorajiya");
})

app.get('/deleteUser/:id',(req,res)=>{
    console.log(req.params);
    const id=req.params.id;
    const userIndex=users.findIndex((user)=>user.id==id);
    users.splice(userIndex,1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        if (err) {
            console.log(err);
        }
        res.json({
            message: "User Deleted",
            id: id});
    })
})

app.post('/createUser', (req, res) => {
    const body = req.body;
    console.log(body);
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        if (err) {
            console.log(err);
        }
        res.json({
            message: "User Created",
            id: users.length});
    })


})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})