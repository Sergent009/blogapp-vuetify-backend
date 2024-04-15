const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true})

mongoose.connection.on('connected', (err) => {
    if(err){
        throw err
    }
    else{
        console.log('server is connected to database')
    }
})

// Mongoose schema
const PostSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    timestamp: String
})

const PostModel = mongoose.model('post', PostSchema)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// express.urlencoded({ extended: true })


// API ROUTES
app.post('/api/post/new',async (req, res) => {
    try{
    let payload = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        timestamp: new Date().getTime()
    }

    let newPost = new PostModel(payload)

    let result = await newPost.save(); // Using await instead of a callback
    res.send({ success: true, result: result });
} catch (err) {
    res.status(500).send({ success: false, msg: err.message }); // Proper error handling
}
})


app.listen(port, () => {
    console.log(`server is running on port : ${port}`)
})