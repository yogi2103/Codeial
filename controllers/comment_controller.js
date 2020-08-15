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

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        // if(comment.user==req.user.id){
            
            //as our comment is also present in post schema so we'll have to delete it first from there,
            //check in mongodb for live demo try deleting directly without deleting from post
            let postId=comment.post;
            comment.remove();

            //updation
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        // }
        // else{
        //     return res.redirect('back');
        // }
    })
}