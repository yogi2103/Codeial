const nodemailer=require('../config/nodemailer');

//another way of exporting a method
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment});
    console.log('inside newComment mailer',comment);
    nodemailer.transporter.sendMail({
        from:'yogesh.baghel86@gmail.com',
        to:comment.user.email,
        subject:'new comment published',
        html:'<h1>Your comment is now published!</h1>'
    },(err,info)=>{
        if(err){
            console.log('error',err);
            return;
        }
        console.log('message sent',info);
        return;
    });
}