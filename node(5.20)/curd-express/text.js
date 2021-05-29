var fs = require('fs')
var dbPath = './views/db.json'

function find(callback) {
    setTimeout(function() {
        var data = 'hello'
        callback(data)
    })
}
find(function(data) {
    console.log(data);
})