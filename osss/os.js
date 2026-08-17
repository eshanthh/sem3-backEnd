const os = require('os')

console.log(os.platform());
console.log(os.arch());
console.log(os.cpus());
console.log(os.hostname());
console.log(os.homedir());
console.log(os.totalmem()/1024**3);
console.log(os.freemem()/1024**3);
console.log(os.uptime());
