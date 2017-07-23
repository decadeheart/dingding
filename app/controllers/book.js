var Book = require('../models/book')//引入book模块
var Collect = require('../models/collect')
var _ = require('underscore')
var fs=require('fs')//读取文件
var path =require('path')

exports.detail=function(req,res){
  var id = req.params.id
  Book.update({_id:id},{$inc:{pv:1}},function(err){
      if(err){
          console.log(err)
      }
  })
  Book.findById(id, function(err, book) {
    res.render('book_detail', {
      title: book.title,
      book: book
    })
  })
}
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

//admin page
exports.new = function(req,res){
  Collect.find({},function(err,collects){
    res.render('book_admin',{
      title: '书籍录入页',
      collects: collects,
      book: {}
    })
  })
}

//admin update book
exports.update = function(req,res){
  var id = req.params.id
  if(id) {
    Book.findById(id, function(err, book) {
      Collect.find({},function(err,collects){
        res.render('book_admin', {
          title: '书籍更新页面',
          book: book,
          collects: colletcs
        })
      })
    })
  }
}

//admin poster
exports.savePoster = function(req,res,next) {
  var posterData = req.files.uploadPoster
  var filePath = posterData.path
  var originalFilename = posterData.originalFilename
  console.log(req.files)
  if(originalFilename){
    fs.readFile(filePath,function(err,data){
      var timestamp=Date.now()
      var type=posterData.type.split('/')[1]
      var poster=timestamp+'.'+type
      var newPath=path.join(__dirname,'../../','/public/bookUpload/'+poster)
      fs.writeFile(newPath, data, function(err){
        req.poster=poster
        next()
      })
    })
  }
  else{
    next()
  }
}

exports.save=function(req,res){
  var id = req.body.book._id
  var bookObj = req.body.book
  var _book
  if(req.poster){
    bookObj.poster = req.poster
  }
  if(id){
    Book.findById(id,function(err,book){
      if(err){
        console.log(err)
      }
      _book = _.extend(book, bookObj)
      _book.save(function(err, book){
        if(err) {
          console.log(err)
        }
        res.redirect('/book/' +book._id) //重定向
      })
    })
  }else{
    _book = new Book(bookObj)
    var collectId = bookObj.collect
    var collectName = bookObj.collectName

    console.log(bookObj);
    _book.save(function(err, book){
      if (err) {
        console.log(err)        
      }
      if(collectId){
        Collect.findById(collectId,function(err,collect){
          collect.books.push(book._id)
          collect.save(function(err,collect){
            res.redirect('/book/'+book._id)
          })
        })
      }
      else if (collectName){
        var collect = new Collect({
          name:collectName,
          books:[book._id]
        })
        collect.save(function(err,collect){
          book.collect=collect._id
          book.save(function(err,book){
            res.redirect('/book/'+book._id)
          })
        })
      }
    })
  }
}

//list page
exports.list = function(req,res) {
  Book.find({})
    .populate('collect', 'name')
    .exec(function(err, books) {
      if (err) {
        console.log(err)
      }

      res.render('list', {
        title: '列表页',
        books: books
      })
    })
}

    //list delete book
exports.del=function(req,res){
        var id = req.query.id

        if (id) {
            Book.remove({ _id: id }, function(err, book) {
                if (err) {
                    console.log(err)
                } else {
                    res.json({ success: 1 })
                }
            })
        }
    }