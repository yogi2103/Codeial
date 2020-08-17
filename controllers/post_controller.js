const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
        let post=await Post.create({     //this post variable is passed to post in ajax below(json)
            content:req.body.content,
            user:req.user.id
        });
        if (req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'Post created!'
            })
        }
        return res.redirect('back');
    }
    catch(err){
        console.log('error',err);
        return;
    }
}

module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //same user can delete the post only who has written the post
        //.id means comparing the object id into string 
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'Post deleted successfully!'
                })
            }
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('error',err);
        return;
    }
}