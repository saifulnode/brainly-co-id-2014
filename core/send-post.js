const fs = require("fs");
const dir = process.cwd();
const getRelated = require(dir+"/core/get-related-post");

module.exports = async (res,data)=>{
  const post = data.db;
  const id = data.id;
  const name = data["name-file"];
  const category = post.category;
  //const dataRelated = await getRelated(category);
  console.log(post);
  return res.end("content post");
};