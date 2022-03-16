const http = require("http");
const parseUrl = require("url-parse");
const dir = process.cwd();
const settings = require(dir+"/setting.json");
const send404 = require(dir+"/core/send404");
const getDataPost = require(dir+"/core/get-data-post");
const sendPost = require(dir+"/core/send-post");
const port = 80;

http.createServer(async(req,res)=>{
  const url = await parseUrl(req.url);
  const pathname = url.pathname;
  const indexContent = "/"+settings["pathname-content"];
  const indexPost = settings["index-post"];
  if(pathname=="/"){
    res.end("home");
  }else if(pathname.indexOf(indexContent)==0 && pathname.indexOf(indexPost)>indexContent.length){
    const pathSplit = pathname.split(indexContent)[1];
    const nameFile = pathSplit.split(indexPost)[0];
    const id = pathSplit.split(indexPost)[1];
    if(nameFile.length>0 && id.length>0){
      const data = await getDataPost(nameFile,id);
      if(data=="err"||data==undefined){
        await send404(res);
      }else{
        await sendPost(res,{
          "db":data,
          "id":id,
          "name-file":nameFile
        });
      };
    }else{
      await send404(res);
    };
  }else{
    await send404(res);
  };
}).listen(port,()=>{
  console.log("server running on port:",port);
});