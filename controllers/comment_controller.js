const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){
    Post.findById(req.body.post /*(in home.ejs name is ejs in comment section type is hidden)*/,function(err,post){
        if(post){
            Comment.create({
                comment:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            })
        }
    })
}