
function executeShell(comand,whenFinish){
    console.log(comand)
    const { exec } = require('child_process');

    exec(comand, (err, stdout, stderr) => {
        if (err) 
            return;
        
        whenFinish();

        });

}

module.exports = executeShell;