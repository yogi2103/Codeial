const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

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

//use express router 
app.use('/',require('./routes/index'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})
