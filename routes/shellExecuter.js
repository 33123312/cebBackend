
function executeShell(comand){
    console.log(comand)
    const { exec } = require('child_process');
    exec(comand, (err, stdout, stderr) => {
        if (err) {
            return;
        }
    
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        });

}

module.exports = executeShell;