const express = require('express');
const router = express.Router();

const {getAllPosts, 
       getPostById,
       createPost,
       updatePostPut,
       updatePostPatch,
       deletePost
    } = require('../controllers/posts.controller');

const posts = [
    {id:1, title: 'Post 1' , content: 'Some content 1', author:'Rafael' },
    {id:2, title: 'Post 2' , content: 'Some content 2', author:'Mario' },
    {id:3, title: 'Post 3' , content: 'Some content 3', author:'Mary' }];


    
router.get('/' , getAllPosts);

router.get('/:id', getPostById);

router.post('/', createPost);

router.put('/:id', updatePostPut);

router.patch('/:id', updatePostPatch);

router.delete('/:id', deletePost);

module.exports = {postRouter : router};