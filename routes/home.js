const express = require('express')
const router = express.Router();
const club = require('../models/club')
// router.get('/',(req,res, next)=>{
//     res.send("Express router is working!");
// });

router.get('/', (req, res, next)=>
{
    club.find((err, docs)=>{
        res.render('home', {clubs: docs}); //home.ejs we hv added ejs extention previuosly
    }).catch(err=>{
        console.log("Something went wrong!")
    })
    
})

router.post('/add', (req, res, next)=>
{
    // const name=req.body.name;
    // const players=req.body.players;
    // const coach= req.body.coach;

    const {name, players, coach}= req.body;

    console.log(name, players, coach);

    const uclClub = new club({
        name,players,coach

    });
    uclClub.save((err)=>{
        if(err) throw err
        console.log("all ok")
        res.redirect('/');
    });

})

//ROUTE TO SHOW UPDATE ELEMENT
router.get('/edit/:id',(req, res, next)=>
{
    console.log(req.params.id);
    club.findOneAndUpdate({_id: req.params.id},req.body, {new:true}, (err, docs)=>{
            if(err){
                console.log("Can't retrieve data and edit because of some database problem!")
                next(err);
            }
            res.render('edit', {club: docs})
    });
  
})

//ROUTE TO UPDATE ELEMENT
router.post('/edit/:id',(req, res, next)=>
{
    club.findOneAndUpdate({_id: req.params.id}, req.body, (err, docs)=>{
        if(err){
            console.log("Can't retrieve data and edit because of some database problem!")
            next(err);
        }
        else
        {
            console.log("Updated Successfully!")
            res.redirect('/');
        }
        
    })

})

//ROUTE TO DELETE ITEM
router.get('/delete/:id', (req,res, next)=>{
    club.findByIdAndDelete({_id:req.params.id}, (err, docs)=>{
        if(err){
            console.log("Soemthing went to wrong toi delete!")
            next(err)
        }
        else{
            console.log("Deleted Successfully!")
            res.redirect('/');
        }
    })
})

module.exports = router;