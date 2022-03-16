const fs = require("fs");
const {ungzip} = require("node-gzip");
const dir = process.cwd();

module.exports = async (nameFile,id)=>{
  console.log(keySecret);
  try{
    let val = await fs.readFileSync(dir+"/db/"+nameFile+".zip");
    val = await ungzip(val);
    val = await JSON.parse(val+"");
    return val[id];
  }catch(e){
    console.log(e);
    return "err";
  };
};