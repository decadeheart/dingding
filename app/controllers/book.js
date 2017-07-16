var Book = require('../models/book')//引入book模块
var Collect = require('../models/collect')

exports.bookShop = function(req,res){
  Collect.find({})
    .populate({
      path:'books',
      select:'title poster',
      options:{limit:3}
    })  
    .exec(function(err,collects){
      if(err) {
        console.log(err)
      }
      res.render('bookShop',{
        title: '书城',
        collects: collects
      })
    })
}