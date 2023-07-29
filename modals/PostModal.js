let mongoose=require('mongoose');

let postSchema=mongoose.Schema({
            name:{type:String},
            location:{type:String},
            likes:{type:Number},
            description:{type:String},
            PostImage: {type:{}},
            date:{type:String},
            createdAt:{type:String}
})

let postModal=mongoose.model("posts",postSchema);

module.exports=postModal