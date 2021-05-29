// 操作文件模块
// 只处理数据，不关心业务
var fs = require('fs')

var dbPath = './views/db.json'
    // 获取所有学生列表
    // 调用方法的时候需要传入一个函数来对访问到的的数据操作
    /* 成功 
            返回文件中的学生列表[]
       失败 
            返回错误对象
         */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}


// 添加保存学生
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = students.length + 1
        students.push(student)
        var fileData = JSON.stringify({
                students: students
            }) // 把数组转换为JSON串
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}

/**
 * save({
 * age:xxx,
 * name:xxx,
 * },callback() {
 *  if (err) {
 *
 * } else {
 * }
 * })
 */

// 查找指定id学生
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var student = students.find(function(item) {
            return id === item.id
        })
        callback(null, student)
    })
}

// 根据学生id更新学生信息
exports.updateById = function(student, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        }
        student.id = parseInt(student.id)
        var students = JSON.parse(data).students
        var stu = students.find(function(item) {
            return student.id === item.id
        })
        for (var key in student) {
            stu[key] = student[key]
        }
        for (var i = 0; i < students.length; i++) {
            if (students[i].id === student.id) {
                students[i] = stu
            }
        }
        // students.push(stu)
        var fileData = JSON.stringify({
                students: students
            }) // 把数组转换为JSON串
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}

// 删除学生
exports.delete = function(id, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var deletedId = students.findIndex(function(item) {
            return item.id === id
        })
        students.splice(deletedId, 1)
            // students.push(stu)
        var fileData = JSON.stringify({
                students: students
            }) // 把数组转换为JSON串
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}