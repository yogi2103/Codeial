const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);
router.get('/sign-out',userController.destroySession);
router.post('/create',userController.create);

//use passport as a middleware to authenticate  
router.post('/create-Session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
     ),userController.createSession);

module.exports=router;
