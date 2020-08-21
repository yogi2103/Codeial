const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy google login
passport.use(new googleStrategy({
    clientID:"70273479143-mm1pnltgce3jmvkooqi2ag26lc5octbl.apps.googleusercontent.com",
    clientSecret:"DNHSheZAfScjB6uXdeiZGNSi",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){

    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error',err);
            return;
        }
        console.log(profile);
        if(user){
            //if found,set this user as req.user    
            return done(null,user);
        }

        //if not found, create the user and set is as req.user
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error',err);
                    return;
                }
                return done(null,user);
            });
        }
    });
}
));