const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            });
        }

        return res.json(200,{
            message:"Sign in Successful,Here is your token, Please keep it safe!",
            data:{
                token:jwt.sign(user.toJSON(),'codial',{expiresIn:'100000'}) //Here we are using same key as in passport-jwt-startegy(secretOrkey)
            }
        })
    }
    catch(err){
        return res.json(500,{
            message:"Internal server error!"
        })
    }
}