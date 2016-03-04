var express = require("express")
var path = require("path")
var app = express()

app.use(express.static(path.join(__dirname, "html")))

var reg = /^[a-zA-Z]+$/

app.get("/check", function(req, res) {
  var delay = Math.floor(Math.random() * 1000)
  var username = req.query.username
  setTimeout(function() {
    var result = {
      available: reg.test(username),
      username: username,
      delay: delay,
    }
    res.set({"Content-Type": "application/json"})
    res.end(JSON.stringify(result))
  },delay)
})

app.post("/register", function(req, res) {
  res.set({"Content-Type": "application/json"})
  res.end(JSON.stringify({success: true}))
})

var port = 8000
app.listen(port, function() {
  console.log("App listen on: " + port)
})
