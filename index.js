const fs = require("fs");
const inquirer = require("inquirer");
const { title } = require("process");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

console.log("Welcome to README-factory. To generate a professional README enter the requested information.")


function promptUser() {
return inquirer
    .prompt([{
        message: "Enter the title of the project:",
        name: "title"
    },
    {
        message: "Enter a description of the project:",
        name: "description"
    }]);
}

function generateReadme(answers) {
    return `
    #${answers.title}
    ${answers.description}
    `
}

promptUser().then(function(answers){
    const readme=generateReadme(answers);
    
    return writeFileAsync("readme.md", readme);
}).then(function(){
    console.log("Successfully created README");
}).catch(function(err){
    console.log(err);
});