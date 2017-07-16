var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var BookSchema = new Schema({
  author: String,
  title: String,
  poster:String,
  year:Number,
  summary: String,
  pv: {
    type: Number,
    default:0
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  meta: {
    createAt: {
      type:Date,
      default:Date.now()
    },
    updateAt: {
      type:Date,
      default: Date.now()
    }
  }
})

BookSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else{
    this.meta.updateAt = Date.now()
  }
  next()
})

BookSchema.statics = {
  fetch: function(cd) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id:id})
      .exec(cb)
  }
}

module.exports = BookSchema