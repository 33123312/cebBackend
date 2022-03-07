
function executeShell(comand){
    console.log(comand)

    return new Promise((resume,reject)=>{
        const { exec } = require('child_process');
        exec(comand, (err, stdout, stderr) => {
            if(err)
                reject(err)
            else
                resume();
        });
    })


}

module.exports = executeShell;