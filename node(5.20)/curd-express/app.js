var express = require('express')
    // var fs = require('fs')

var bodyParser = require('body-parser')
var app = express()
var router = require('./router')

// 配置模板引擎
app.engine('html', require('express-art-template'))

// 配置post请求体，方便得到post请求数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    //公开静态资源
app.use('/public/', express.static('./public/'))
app.use('/node_modules', express.static('./node_modules/'))


app.use(router)

app.listen(3000, function() {
    console.log('running...');
})