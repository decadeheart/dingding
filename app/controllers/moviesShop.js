 var Movie = require('../models/movie') //引入movie模块
var Category= require('../models/category')

//index page
exports.moviesShop =function(req,res){
    Category.find({})
            .populate({
                path:'movies',
                select:'title poster',
                options:{limit:3}
            })
            .exec(function(err,categories){
            if (err) {
                console.log(err)
            }
            res.render('moviesShop', {
                title: '视频商城',
                categories: categories
            })
        })
}
