const {fileterObj} = require('../util/filterObj');
const { Post } = require('../models/post.model')



exports.getAllPosts = async (req, res)=> {
    try {
        const postsDB = await Post.findAll({status: 'Active'});

        res.status(200).json({status: 'success',
        data: {
            posts: postsDB
        }});
    } catch (error) {
        console.log(error);
    }

   
};

exports.getPostById = async (req, res) => {
    try {
        const {id} = req.params;

        const post = await Post.findOne({ 
            where: 
                { 
                id: id , 
                status: 'Active' 
            }
        });

        if(!post){
            res.status(404).json({
                status: 'Error',
                message: 'Post not found with the given id'
            });
        return; 
        }
        res.status(200).json({
            status: 'success',
            data: {
                post
    }
})
    } catch (error) {
        console.log(error);
    }
};

exports.createPost = async (req, res) => {

    try {
    const {title,content, author } = req.body;

    const newPost = await Post.create({
        title: title,
        content: content,
        author: author
    });

    posts.push(newPost);
    res.status(201).json(
        {status:'success',
        data: {newPost}});
    } catch (error) {
        console.log(error);
    }
    
};

exports.updatePostPut = async (req,res)=>{
    try {
        const {id} = req.params;
        const {title,content,author} = req.body;

    if(!title || !content || !author || title.length === 0 || content.length === 0 || author.length === 0 ){
        res.status(400).json({status: 'error', message: 'Must provide title, content and author for this request'});
        return;
    }

    const post = await Post.findOne({where:{id:id, status: 'Active'}});

    if(!post){
        res.status(404).json(
            {status:'error' , 
            message: 'no post foun by the given id'}
        );
        return;
    }

    await post.update({
        title: title,
        content: content,
        author: author
    });

    res.status(204).json({status: 'success'})

    } catch (error) {
        console.log(error);
    }
};

exports.updatePostPatch = async (req,res) => {
    try {
        const {id} = req.params;
        const data = fileterObj(req.body, 'title' , 'content' , 'author' );

        const post = await Post.findOne({ where: {  id: id , status: 'Active' }});

        if(!post){
            res.status(404).json(
                {status: 'error' , 
                message:'Cant update post, invalid ID'
            });
        }

        await post.update({...data});

        res.status(204).json({status:'success'});
    } catch (error) {
        console.log(error);
    }
};

exports.deletePost = async (req,res) => {
  try {
    const {id} = req.params;

    const post = await Post.findOne({where:{id:id}});

    if(!post){
        res.status(404).json({status:'error',
        message: 'No delete post, ID doesnot exist'});
        return;
    }
    // DELETE FROM posts WHERE id = 1;
    // await post.destroy();

    await post.update({status: 'Deleted'});

    res.status(204).json({status:'success'});
  } catch (error) {
      console.log(error);
  }
};