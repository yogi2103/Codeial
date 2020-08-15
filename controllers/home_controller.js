const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.home=function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: 'Home',
    //         posts:posts
    //     });
    // })
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title: 'Home',
            posts:posts
        })
})
}
