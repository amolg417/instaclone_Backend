const bodyParser = require('body-parser');
let express = require('express');
let app = express();
let cors=require('cors');
let path=require('path')
let multer=require('multer');
require('dotenv').config()
let mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public/Pictures'))
let postModal = require('./modals/PostModal')
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { dbName: "InstaclonePosts" })
    .then(() => console.log("DataBase is Connected"))
    .catch((err) => console.log("Failed to Connect", err))

let storage=multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,'public/Pictures')
    }
    ,
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})


let upload=multer({
    storage:storage
})



app.get("/post", (req, res) => {
    postModal.find({}).sort({createdAt:-1})
    .then((data)=>{
        res.json({
            posts:data
        })
    })
    .catch(err=>{
        res.json({
            errorDescription:err
        })
    })
})

app.post('/uploadPost',upload.single('file'), async (req, res) => {
    let { Author, location, description} = req.body
    post = new postModal({
        name: Author,
        location: location,
        likes: Math.floor(Math.random() * 100),
        description: description,
        PostImage: req.file.filename,
        date: new Date().toLocaleDateString(),
        createdAt:Date.now()
    })
    try {
        let data = await post.save()
        res.json({
            post: "post created Successfully"
        })
    } catch (err) {
        res.json({
            errorDescription: "something went wrong"
        })
    }
})

app.listen(process.env.PORT, () => console.log("App is Running"))
