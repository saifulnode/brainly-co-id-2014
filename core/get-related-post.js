const fs = require("fs");
const {ungzip} = require("node-gzip");
const dir = process.cwd();
const settings = require(dir+"/setting.json");
const getDataPost = require(dir+"/core/get-data-post");

module.exports = async (category)=>{
  const sendBack = {};
  for(let name of category){
    sendBack[name]=[];
    const nameCategory = name.replace(/ /g,"-");
    try{
      let val = await fs.readFileSync(dir+"/category/"+nameCategory+".gzip");
      val = await ungzip(val);
      val = await JSON.parse(val+"");
      const countRelated = settings["related-post"].count;
      for(let i=0;i<countRelated;i++){
        const randomPost = Math.floor(Math.random() * val.length);
        const idPost = val[randomPost];
        const dataPost = await getDataPost(idPost);
        console.log(dataPost);
      };
    }catch(e){};
  };
  console.log(sendBack)
  return [];
};