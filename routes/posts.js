const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const postController=require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create);

module.exports= router;