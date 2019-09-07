var express=require('express');
var mongoose=require('mongoose');

// var commentSchema=new mongoose.Schema({
//     author:String,
//     about:String,
//     created:{type:Date,default:Date.now}
// })



var blogSchema= new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    comment:[{
        author:String,
        about:String,
        created:{type:Date,default:Date.now}

    }]
});



module.exports=mongoose.model("Blog",blogSchema);