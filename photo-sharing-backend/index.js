const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AuthRouter = require("./routes/AuthRouter");

dbConnect();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use("/api", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api", AuthRouter)

const path = require('path')
const fs = require("fs")

// const { fileName } = req.params
console.log(path.join(__dirname, '..', 'images', "1748903561150-683d718262b4fbff0af1a25c.jpg"))
console.log("file")
fs.readFile(path.join(__dirname, '..', 'images', "1748903561150-683d718262b4fbff0af1a25c.jpg"), "utf-8", (err, data) => {
  if(err) {
    console.log(err)
    return
  }
  console.log("data: ", data)
})
app.listen(8081, () => {
  console.log("server listening on port 8081");
});
