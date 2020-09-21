const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");
const { Comment } = require('../models/comments');

//=================================
//             Comments
//=================================

router.post("/addComment", auth, async (req, res) => {
    const commentData=req.body;
    const comment=new Comment(commentData);
    try{
        const commentAdded= await comment.save();
        Comment.find({ _id: commentAdded._id})
        .populate('sender')
        .exec((err, result)=>{
            if (err) return res.status(404).json({ msg: err.message });    
            return res.status(200).json({ success: true , result})
        })
    }
    catch(err){
        res.status(400).json({ msg: err.message });
    }
});

router.post("/getComments", auth, async (req, res) => {
    try{
        Comment.find({ movieId: req.body.movieId })
        .populate('sender')
        .exec((err, comments)=>{
            if (err) return res.status(400).json({ msg: err });    
            return res.status(200).json({ success: true , comments })
        })
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
});

module.exports = router;
