const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");
const { Like } = require('../models/likes');
const {Dislike}=require('../models/dislikes');

//=================================
//             Likes
//=================================

router.post("/like", auth, async (req, res) => {
    let likeData={};
    if(req.body.movieId){
        likeData={ movieId: req.body.movieId}
    }else{
        likeData={ commentId: req.body.commentId}
    }
    
    const like=new Like(likeData);
    try{
        const addedLike= await like.save();
        const removeDislike=await Dislike.findOneAndDelete(likeData)
        res.status(200).json({ success: true });
        
    }
    catch(err){
        res.status(400).json({ msg: err.message });
    }
});

router.post("/dislike", auth, async (req, res) => {
    let likeData={};
    if(req.body.movieId){
        likeData={ movieId: req.body.movieId}
    }else{
        likeData={ commentId: req.body.commentId}
    }
    
    const dislike=new Dislike(likeData);
    try{
        const addedDislike= await dislike.save();
        const removeLike=await Like.findOneAndDelete(likeData)
        res.status(200).json({ success: true });
        
    }
    catch(err){
        res.status(400).json({ msg: err.message });
    }
});


router.post("/unlike", auth, async (req, res) => {
    let likeData={};
    if(req.body.movieId){
        likeData={ movieId: req.body.movieId}
    }else{
        likeData={ commentId: req.body.commentId}
    }
    
    try{
        const removeLike=await Like.findOneAndDelete(likeData)
        res.status(200).json({ success: true });
        
    }
    catch(err){
        res.status(400).json({ msg: err.message });
    }
});

router.post("/undislike", auth, async (req, res) => {
    let likeData={};
    if(req.body.movieId){
        likeData={ movieId: req.body.movieId}
    }else{
        likeData={ commentId: req.body.commentId}
    }
    
    try{
        const removeDislike=await Dislike.findOneAndDelete(likeData)
        res.status(200).json({ success: true });
        
    }
    catch(err){
        res.status(400).json({ msg: err.message });
    }
});


router.post("/getLikes", auth, async (req, res) => {
    let likeData={};
    if(req.body.movieId){
        likeData={ movieId: req.body.movieId}
    }else{
        likeData={ commentId: req.body.commentId}
    }
    try{
        const likes=await Like.find(likeData)
        res.status(200).json({ success: true , likes })
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
});

router.post("/getDislikes", auth, async (req, res) => {
    let likeData={};
    if(req.body.movieId){
        likeData={ movieId: req.body.movieId}
    }else{
        likeData={ commentId: req.body.commentId}
    }
    try{
        const dislikes=await Like.find(likeData)
        res.status(200).json({ success: true , dislikes })
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
});

module.exports = router;
