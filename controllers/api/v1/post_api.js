const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}

module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //same user can delete the post only who has written the post
        //.id means comparing the object id into string 
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:'Post deleted successfully!'
            //     })
            // }
            return res.json(200,{
                message:"Posts deleted successfully!"
            });
         }
         else{
             return res.json(401,{
                 message:"You are not authorized to delete this!"
             });
         }
    }
    catch(err){
       return res.json(500,{
           message:"Internal server error!"
       })
    }
}