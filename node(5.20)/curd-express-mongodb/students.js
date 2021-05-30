var fs = require('fs')
var mongoose = require('mongoose')

var Schema = mongoose.Schema // 
    // 连接数据库
mongoose.connect('mongodb://localhost/crud-mongodb')

// 设计表结构
var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [1, 2],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    }
})

// 发布模型构造函数

module.exports = mongoose.model('Student', studentSchema)