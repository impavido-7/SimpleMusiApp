const { exec } = require("child_process");

const cmd = (cmdLine) => {
    exec(cmdLine, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}

cmd("cd client && npm start");
cmd("cd server && npm start");