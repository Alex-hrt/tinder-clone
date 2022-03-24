const PORT = 8000
const express = require("express")
const { MongoClient } = require("mongodb")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const uri = "mongodb+srv://Criticalex:123@cluster0.n1wpv.mongodb.net/Cluster0?retryWrites=true&w=majority"
const bcrypt = require("bcrypt")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello to my app")
})

app.post("/signup", (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = bcrypt.hash(password, 10)

    try {
        client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const existingUser = users.findOne({ email })

        if (existingUser) {
            return res.status(409).send("User already exists. Please login")
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })

        res.status(201).json({ token, user_id: generatedUserId, emai: sanitizedEmail })
    } catch (error) {
        console.log(error)
    }
})

app.get("/users", async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})


app.listen(PORT, () => console.log("Server is running on PORT " + PORT))