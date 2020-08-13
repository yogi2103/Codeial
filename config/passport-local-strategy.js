const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){              //done is a callback function reporting back to passport
        //find a user and identify its identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('err');
                return done(err); //will report error to passport
            }
            if(!user || user.password!=password){
                console.log('Invalid username password');
                return done(null,false);    //authentication is not done here 
            }
            return done(null,user);
        });
    }   
));

//serialize the user
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialize the user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('err');
            return done(err);
        }
        return done(null,user); 
    });
});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and sending it to local for views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;