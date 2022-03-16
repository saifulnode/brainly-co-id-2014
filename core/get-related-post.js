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
        const mapPost = val[randomPost];
        const nameFile = await mapPost[0].replace(".zip","");
        const idPost = mapPost[1];
        const dataPost = await getDataPost(nameFile,idPost);
        await sendBack[name].push({
          "title" : dataPost.title,
          "time" : dataPost.time,
          "path-link" : "/"+settings["pathname-content"]+nameFile+settings["index-post"]+idPost
        });
      };
    }catch(e){};
  };
  return sendBack;
};