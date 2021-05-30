var fs = require('fs')
var express = require('express')
var Students = require('./students')
const { parse } = require('path')

var router = express.Router() // 创建路由容器
    // 渲染首页
router.get('/', function(req, res) {
    res.redirect('/students')
})
router.get('/students', function(req, res) {
    // fs.readFile('./views/db.json', 'utf-8', function(err, data) {
    //     if (err) {
    //         return res.status(500).send('Server error')
    //     }
    //     res.render('index.html', {
    //         title: 'crud',
    //         fruits: ['苹果', '香蕉', '梨子'],
    //         students: JSON.parse(data).students
    //     })
    // })
    Students.find(function(err, students) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.render('index.html', {
            title: 'crud',
            fruits: ['苹果', '香蕉', '梨子'],
            students: students
        })
    })
})

router.get('/students/new', function(req, res) {
    res.render('new.html')
})

router.post('/students/new', function(req, res) {
    new Students(req.body).save(function(err) {
        if (err) {
            return res.status(500).send('Server error')
        } else {
            console.log('添加成功');
            res.redirect('/students')
        }
    })

})

router.get('/students/edit', function(req, res) {

    //1.根据id可以得到该学生的信息，然后使用模板引擎渲染该页面
    if (req.query.id) {
        Students.findById(req.query.id, function(err, student) {
            if (err) {
                return res.status(500).send('Server error')
            }
            res.render('edit.html', {
                student: student
            })
        })
    } else {
        res.send('页面丢失了....')
    }
})


router.post('/students/edit', function(req, res) {
    Students.findByIdAndUpdate(req.body.id, req.body, function(err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        console.log('修改成功');
        res.redirect('/students')

    })
})

router.get('/students/delete', function(req, res) {
    Students.findByIdAndDelete(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        console.log('删除成功');
        res.redirect('/students')
    })

})

module.exports = router