const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  var today = date.getDate();

  res.render('list', {
    title: today,
    newItems: items
  });
});

app.post("/", (req, res)=>{
  let item = req.body.newItem;
  if (req.body.button === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res)=>{
  res.render('list', {
    title: "Work List",
    newItems: workItems
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
