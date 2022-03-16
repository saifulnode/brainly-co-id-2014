const fs = require("fs");
const dir = process.cwd();

module.exports = async (res,data)=>{
  const post = data.db;
  const id = data.id;
  const name = data["name-file"];
  console.log(post,id,name);
  return res.end("content post");
};