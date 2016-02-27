var express = require("express")
var path = require("path")
var app = express()

app.use(express.static(path.join(__dirname, "html")))

app.get("/test", function(req, res) {
  res.end("this is the test")
})

app.listen(8000)
