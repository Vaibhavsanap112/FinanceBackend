const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000,()=>{
  console.log("App is running on prot 5000");
})