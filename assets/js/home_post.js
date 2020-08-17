{
    //method to submit the form using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),  //Content would be the key and value filled will be value (json)
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);  //here we have prepend means recently posted will shown first
                    deletePost($(' .delete-post-button',newPost));
                    //console.log(data);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        });
    }
    //method to create a post in DOM
    let newPostDom=function(post){
        //interpolation
        return $(`<li id="post-${post._id}">              
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small> 
        ${post.content}
    </li>
    <small>
        ${post.user.email}
    </small>
    <div class="post-comments">
        <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="Comment Here...."> 
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Comment">
        </form>     
    <div class="post-comments-list">
        <ul id="post-comments-${post._id}">
        </ul>
    </div>
    </div>
    `)   
    }

    //method to delete a post from DOM
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'), //get the value of href from delet link
                success:function(data){
                    $(`#post-${data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    createPost();
}