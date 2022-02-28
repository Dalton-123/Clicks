const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const reqLogin = require('../middleware/reqLogin')
const Category =  mongoose.model("Category")



router.get('/categories',reqLogin,(req,res)=>{
    Category.find()
        .then((categories)=>{
            res.json({categories})
        }).catch(err=>{
        console.log(err)
    })

})






router.post('/createcategory',reqLogin,(req,res)=>{
    const {name,icon} = req.body
    if(!name ){
        return  res.status(422).json({error:"Please enter name"})
    }

    const category = new Category({
        name,icon

    })
    category.save().then(result=>{
        res.json({category:result})
    })
        .catch(err=>{
            console.log(err)
        })
})






router.delete('/deletepost/:postId',reqLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
        .populate("postedBy","_id")
        .exec((err,post)=>{
            if(err || !post){
                return res.status(422).json({error:err})
            }
            if(post.postedBy._id.toString() === req.user._id.toString()){
                post.remove()
                    .then(result=>{
                        res.json(result)
                    }).catch(err=>{
                    console.log(err)
                })
            }
        })
})
module.exports = router