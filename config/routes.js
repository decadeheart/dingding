var Index = require('../app/controllers/index') //引入movie模块
var MoviesShop = require('../app/controllers/moviesShop')
var User = require('../app/controllers/user') //引入User模块
var Movie= require('../app/controllers/movie') //引入movie模块
var Comment=require('../app/controllers/comment')
var Category=require('../app/controllers/category')
var Post=require('../app/models/post')


module.exports = function(app) {
    
   
    //pre handle user 会话持久
    app.use(function(req, res, next) {
        var _user = req.session.user
        
        app.locals.user = _user
        
        next()
    })
app.get('/post/:id',function(req,res){
  
// req.params 获取路径变量值，这里指id这个变量
  var id = req.params.id;
  Post.update({_id:id},{$inc:{pv:1}},function(err){
    if(err){
        console.log(err)
    }
  })

  Post.findById({_id:id}, function(err,post) {
    res.render('post_detail',{
      title:post.title,
      post: post
    });
  });

});
// 编辑帖子
app.get('/post',function(req,res){
  res.render('post',{
    title:'编辑帖子',
    post:{
      title:'',
      writer:'',
      text:''
    }
  })
})
// 帖子更新
app.get('/post/update/:id',function(req,res){
  var id=req.params.id;
  if(id){
    Post.findById(id,function(err,post){
       res.render('post',{
        title:'更新帖子',
        post:post
       });
    });
  }
});
// 帖子录入
app.post('/post/new', function(req, res) {
   console.log("infomation:"+req.body.post)
  if(!req.body) return res.sendStatus(400);
  var id = req.body.post._id;
  var postObj = req.body.post;
  var _post;
  
  if( id != 'undefined' && id != '' ) {
//检查判断是否已经存在
    console.log('take hello');
    console.log(id);

    Post.findById(id, function(err,post) {
      if(err){
        console.log(err);
      }
      // 用新字段替换老字段
      _post = _.extend(post, postObj);
      _post.save(function(err, _post) {
        if(err){
          console.log(err);
        }
        res.redirect('/post/'+_post._id);
      });
    });

  }else{

    _post = new Post({
      title: postObj.title,
      writer: postObj.writer,
      text: postObj.text
    });
    _post.save(function(err,post){
      if(err){
        console.log(err);
      }
      res.redirect('/post/'+post._id);
    });

  }
  

});
    //关于
    app.get('/about',function(req,res,next){
        res.render('about',{
            title:'关于'
        })
    })
    app.get('/contact',function(req,res,next){
        res.render('contact',{
            title:'关于'
        })
    })
        app.get('/test',function(req,res,next){
        res.render('test',{
            title:'测试'
        })
    })
            app.get('/test2',function(req,res,next){
        res.render('test2',{
            title:'测试'
        })
    })
    // 社区
    app.get('/community',function(req,res,next){
        Post.fetch(function(err,posts){
            if(err){
                console.log(err);
            }
            res.render('community',{
            title:'社区',
            posts:posts
        })
        })

    })
    // 帖子列表
    app.get('/postlist',function(req,res,next){
        Post.fetch(function(err,posts){
            if(err){
                console.log(err);
            }
            res.render('post_list',{
            title:'帖子列表',
            posts:posts
        })
        })

    })
    // 帖子删除
    app.delete('/postlist',function(req,res){
        var id=req.query.id;
        console.log(id);
        if(id){
            Post.remove({_id:id},function(err){
                if(err){
                    console.log(err);
                }else{
                    res.json({success:1});
                }
            })
        }
    })
    app.get('/control',function(req,res,next){
        Post.fetch(function(err,posts){
            if(err){
              console.log(err)
            }else{
              res.render('control',{
                title:'控制台',
                posts:posts
              })
            }
        })
    })
    app.get('/signup',function(req,res){
      res.render('signup',{
        title:'zhuce'
      })
    })   
    //Index
    app.get('/', Index.index)
     //User
    app.post('/user/signup', User.signup)
    app.post('/admin/signin', User.signin)
    app.get('/signin',User.showSignin)
    app.get('/logout', User.logout)
    app.get('/admin/user/list', User.signinRequired,User.adminRequired,User.list)


    //Movie
    app.get('/movie/:id', Movie.detail)
    app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
    app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
    app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.savePoster,Movie.save)
    app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
    app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)


    //Comment
    app.post('/user/comment',User.signinRequired,Comment.save)

    //Category
    app.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new)
    app.post('/admin/category',User.signinRequired,User.adminRequired,Category.save)
    app.get('/admin/category/list',User.signinRequired,User.adminRequired,Category.list)


    //results
    app.get('/results',Index.search)

    //电影列表页
    app.get('/moviesShop',MoviesShop.moviesShop)

    //个人中心
    app.get('/mycenter',function(req,res){
        res.render('mycenter',{
            title:'个人中心'
        })
    })
    
    //个人账户
    app.get('/myaccount',function(req,res){
        res.render('myaccount',{
            title:'个人账户'
        })
    })
}