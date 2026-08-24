
import fs from 'fs'
console.log(1);
// create
fs.writeFileSync("abt.js", "helllooo")
//read
let data = fs.readFileSync("abt.js")
console.log(data);

// create async
fs.writeFile("new.js", "newww", () => {
    console.log("jdkfgj");

})
//change text
fs.appendFileSync("abt.js", "dsjg")
console.log(8);
// delete
fs.unlink("abt.js", () => console.log(4))
//create folder
// fs.mkdirSync("file")
//write
fs.writeFileSync("file/nn.js","initt")
// update file in folder
fs.writeFileSync("file/nn.js", "jssssss")
// read
let d = fs.readFileSync('file/nn.js')
console.log(d);

//delete
// fs.unlinkSync('file/nn.js')
