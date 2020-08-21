const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);
router.get('/sign-out',userController.destroySession);
router.post('/create',userController.create);
router.post('/update/:id',userController.update);
//use passport as a middleware to authenticate  
router.post('/create-Session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
     ),userController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

//url at which we will receive data from google
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);
module.exports=router;
