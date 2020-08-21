const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,users){
        res.render('User_profile',{
        title:"Jhakas!😂",
        profile_user:users    
    })
})
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup',{
        title:"Codial Sign up!"
    })
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signin',{
        title:"Codial Sign In!"
    })
}

module.exports.create=function(req,res){
    if (req.body.password != req.body.Confirm_Password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged out successfully');
    return res.redirect('/');
}

module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    // }
    if(req.user.id==req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer error',err);
                }
                user.email=req.body.email;
                if(req.file){

                    //to check if there's already an avatar then replace the current one(remove it)
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    //saving the path of uploaded file into the avatar field in user schema
                    user.avatar=User.avatarPath +'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
                //console.log(req.file);
            });

        }
        catch(err){
            console.log(err);
            return;
        }
    }
}