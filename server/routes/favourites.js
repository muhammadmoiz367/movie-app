const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");
const { Favourite } = require('../models/favourite');

//=================================
//             Favourite
//=================================

router.post("/getFavouriteNumber", auth, async (req, res) => {
    try{
        const response=await Favourite.find({ "id": req.body.id})
        res.status(200).json({ success: true, favouriteNumber: response.length})
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
    
});

router.post("/getFavouriteMovies", auth, async (req, res) => {
    try{
        const favourites=await Favourite.find({ "userFrom": req.body.userFrom })
        res.status(200).json({ success: true, favourites})
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
    
});


router.post("/checkFavourite", auth, async (req, res) => {
    try{
        const response=await Favourite.find({ id: req.body.id, userFrom: req.body.userFrom })
        let findResult=false;
        if(response.length !== 0){
            findResult=true
        }
        res.status(200).json({ success: true, favourite: findResult })
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
    
});

router.post("/addFavourite", auth, async (req, res) => {
    const favouriteData=req.body;
    const favourite=new Favourite(favouriteData);
    
    try{
        const favouriteAdded= await favourite.save();
        res.status(200).json({ success: true , msg: 'added to favourite'})
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
});

router.post("/removeFavourite", auth, async (req, res) => {
    try{
        const favouriteDeleted=await Favourite.findOneAndDelete({ id: req.body.id, userFrom: req.body.userFrom })
        res.status(200).json({ success: true , msg: 'removed from favourite'})
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
});

router.post("/removeAllFavourite", auth, async (req, res) => {
    try{
        const favouriteDeleted=await Favourite.deleteMany({})
        res.status(200).json({ success: true , msg: 'removed all watchlists'})
    }
    catch(err){
        res.status(400).json({ msg: err });
    }
});


module.exports = router;
