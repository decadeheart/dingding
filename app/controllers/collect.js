var Collect = require('../models/collect')

exports.new = function(req,res){
  res.render('collect_admin',{
    title: '后台书籍分类录入页',
    collect:{}
  })
}
exports.save = function(req,res) {
  var _collect = req.body.collect
  var collect = new Collect(_collect)
  collect.save(function(err,collect) {
    if(err) {
      console.log(err)
    }
    res.redirect('/admin/collect/list')
  })
}

//Collectlist page
exports.list = function(req,res) {
  Collect.fetch(function(err,collects) {
    if(err) {
      console.log(err)
    }
    res.render('collectllist', {
      title: '书籍分类列表页',
      collects:collects
    })
  })
}