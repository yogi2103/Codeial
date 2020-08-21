const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requied:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        //mime type determines the type of file you're uploading
        type:String
    }
},{timestamps:true});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());  //Field name is avatar in schema above
    }
  });

  //static functions
  userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
  userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model('User',userSchema);
module.exports=User;