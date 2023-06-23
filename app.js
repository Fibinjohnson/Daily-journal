const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ObjectId=require("mongodb").ObjectId
const _ = require("lodash");
const {connectToDb}=require("./connection")
const { Collection}=require("./collection")
require('dotenv').config();
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',(async(req,res)=>{
  const homeDescription="'The more that you read, the more things you will know. The more that you learn, the more places you will go.' - Dr. Seuss"
  const db=await connectToDb();
  const blogdata=await db.collection(Collection.collectionBlog).find().toArray()
  console.log(blogdata)
res.render("home",{homeContent:blogdata,homeDescription}
)

}))



app.get('/contact',((req,res)=>{
  res.render('contact',{contactContent:contactContent})
})
)

app.get("/compose",(req,res)=>{
  res.render("compose")
})

app.post('/compose',async(req,res)=>{
 let postDetails={
    postBody:req.body.postBody,
    postTitle:req.body.postTitle
 }
 
 const db=await connectToDb();
 const blog= await db.collection(Collection.collectionBlog).insertOne({postDetails})
 console.log(blog)
 res.redirect('/')

})

app.get("/posts/:id",async(req,res)=>{
  const ID=new ObjectId(req.params.id)
  const db=await connectToDb()
  const singleBlog=await db.collection(Collection.collectionBlog).findOne({_id:ID})
  console.log(singleBlog)
  res.render("post",{singleBlog})
})


connectToDb().then(()=>{
  app.listen(process.env.PORT||3000, function() {
    console.log("Server started on port 3000");
  });
}).catch((error)=>{
  console.log(error)
})

