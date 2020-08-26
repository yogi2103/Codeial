const nodemailer=require('../config/nodemailer');

//another way of exporting a method
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs'/*Path in ejs under mailer & comments*/);
    console.log('inside newComment mailer',comment);
    nodemailer.transporter.sendMail({
        from:'yogesh.baghel86@gmail.com',
        to:comment.user.email,
        subject:'new comment published',
        html: htmlString    /*mostly people use tabular format in ejs because it does not get deformed on any device */
    },(err,info)=>{
        if(err){
            console.log('error',err);
            return;
        }
        console.log('message sent',info);
        return;
    });
}