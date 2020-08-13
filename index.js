const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');       //used for session cookie
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//for reading through post requests
app.use(express.urlencoded());
app.use(cookieParser());    

//for rendering static files
app.use(express.static('./assets'));

//for express layouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({       //variable name declared above as session
    name:'CODIAL',
    //todo change the secret key before deploying it to production mode 
    secret:'blahblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)

    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); //check for if user is already logged in(session cookie is present or not)

//use express router 
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})
