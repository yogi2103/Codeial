const User=require('../models/user');
module.exports.profile=function(req,res){
    res.render('User_profile',{
        title:"Jhakas!😂"
    });
}

module.exports.signup=function(req,res){
    return res.render('signup',{
        title:"Codial Sign up!"
    })
}

module.exports.signin=function(req,res){
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