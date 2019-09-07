var express=require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var nodemailer=require('nodemailer');
var methodOverride = require("method-override"),
Blog=require("./models/blog");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine",".ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


mongoose.connect("mongodb://127.0.0.1:27017/blogv3");

// mongoose config



app.get("/",function(req,res) {
    res.redirect("/blogs");
})

app.get("/blogs",function(req,res) {
    Blog.find({},function(err,foundblog) {
        if(err) {
            console.log(err);
        } else {
            res.render("index.ejs",{foundblog:foundblog});
            
        }
    })
})
   
app.post("/blogs",function(req,res) {
    var newblog={
        title:req.body.title,
        image:req.body.image,
        body:req.body.body,
    };
    Blog.create(newblog,function(err,created) {
        if(err) {
            console.log(err);
        } else {
            console.log(created);
            res.redirect("/blogs");
        }
    })
})





app.get("/blogs/:id",function(req,res) {
    Blog.findById(req.params.id,function(err,found) {
        if(err) {
            console.log(err);
        } else {
             console.log("we are in get route======")
            console.log(found)
            res.render("show.ejs",{found:found});
        }
    });
});

app.post("/blogs/:id",function(req,res) {
    Blog.findByIdAndUpdate(req.params.id,function(err,found) {
        if(err) {
            console.log(err); 
        } else {
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

app.get("/new",function(req,res) {
    res.render("new.ejs");
})


app.get("/blogs/:id/edit",function(req,res) {
    Blog.findById(req.params.id,function(err,found) {
        if(err) {
            console.log(err);
        } else {
            res.render("edit.ejs",{found:found});
        }
    })
})





app.get("/contact",function(req,res) {
 
    res.render("contact.ejs");
       
});


app.post("/contact",function(req,res) {
    var username=req.body.username;
    var message=req.body.message;
    var name=req.body.name;
    var transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'ritikonlyuse@gmail.com',
            pass:'ritikonlyuse12345'
        }
    });
    var mailOptions={
        from:username,
        to:'ritikonlyuse@gmail.com',
        subject:'new message from '+req.body.name,
        text:message
    };

    transporter.sendMail(mailOptions,function(err,sent) {
        if(err) {
            console.log(err);
        } else {
            console.log(sent);
        }
    })

    res.redirect("/contact");
})

app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
    //redirect somewhere
 });

app.get("/about",function(req,res) {

    res.render("about.ejs");
});


app.post("/blogs/:id/comments",function(req,res) {
    var newcomment={
        author:req.body.author,
        about:req.body.about
    }
    Blog.findById(req.params.id,function(err,found) {
        if(err) {
            console.log(err);
        } else {
            console.log(found);
            console.log('=========');
            found.comment.push(newcomment);
            console.log(newcomment);
            console.log('==========');
            console.log(found);
            found.save();

            // res.redirect("/blogs/"+req.params.id);
            res.render("show.ejs",{found:found});
           // res.redirect("/blogs"+req.params.id);
            console.log("helo i'm ritik");
        }
    });
})






app.listen(5000,function() {
    console.log("server started");
})



