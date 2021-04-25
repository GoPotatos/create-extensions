const fs=require("fs")
const axios=require("axios");
const PATH=require("path")
const PREFIX="timed-scraper-for-ranker-YSA";
const BASE='.ranker.com/?keywords='
const child_process=require("child_process")
SCRIPT_ID=""
//path="D:\\Zakas\\extensions\\timed-ranker";
path=PATH.resolve("../","extensions","timed-ranker")
axios.get(SCRIPT_ID).then(data=>{
//console.log(data.data)
//data={data:[[1,"results"],[2,"searchresults"]]}
for(item of data.data){
	console.log(item)
	const dirPath=PATH.resolve(__dirname,"timed-scraper-for-ranker-YSA"+item[0])
	child_process.execSync('xcopy "'+path +'" "'+__dirname+"\\"+PREFIX+item[0]+'\\" /E/H/y')
	const backgroundPath=PATH.resolve(dirPath,"background.js")
	const manifestPath=PATH.resolve(dirPath,"manifest.json")
	const lines=fs.readFileSync(backgroundPath).toString().split("\n")
	index=lines.findIndex(item=>item.includes("const SCRIPT_ID"))
	lines[index]='const SCRIPT_ID="'+item[2]+'";';
	lines[index+1]='const BASE="https://'+item[1]+BASE+'"';
	lines[index+2]='const VER="'+item[0]+'"';
	fs.writeFileSync(backgroundPath,lines.join("\n"))
	const manifest=require(manifestPath)
	manifest.name=PREFIX+item[0]
	manifest.description="Scheduled search in "+item[1]+".ranker.com"
	manifest["content_scripts"][0].matches=['*://'+item[1]+".ranker.com/*"]
	fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,4))

	//child_process.execSync('xcopy "'+path +'" "'+__dirname+"\\"+PREFIX+item[0]+'\\" /E/H')
}
})
