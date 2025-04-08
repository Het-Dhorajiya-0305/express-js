import mongoose from 'mongoose';
import express from 'express';
import fs from 'fs';


const app = express();

// connection

mongoose
    .connect('mongodb://127.0.0.1:27017/your_database_name')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("mongoose error", err));
// schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model("user", userSchema);


app.use(express.urlencoded({ extended: false }))

app.get("/users", async (req, res) => {
    const allUser=await User.find({})
    return res.json(allUser);
})
app.get("/users/:userId",async (req, res) => {
    const id=req.params.userId;
    
    const user=await User.findById(id)
    return res.status(200).json(user);
})
app.get("/about", (req, res) => {
    return res.send("Hello World from het dhorajiya");
})

app.get('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;

    const deleteUser=await User.findByIdAndDelete(id)

    console.log("deleted user",deleteUser);
    return res.status(200).json({
        message: "User deleted successfully"
    })

})

app.post('/createUser', async (req, res) => {
    const body = req.body;
    console.log("body : ",body);
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    const newUser = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    console.log("new user",newUser);
    return res.status(200).json(newUser);



})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})