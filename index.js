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
    },
    {
        message: "Enter installation instructions for the application:",
        name: "installation"
    },
    {
        message: "Please enter usage examples and reference information:",
        name: "usage"
    },
    {
        message: "Select license type:",
        type: "checkbox",
        choices: ["MIT", "GNU GPLv3", "GNU AGPLv3", "GNU LGPLv3", "Mozilla Pub 2.0", "Apache 2.0", "Boost Software 1.0", "Unlicense"],
        name: "license"
    },
    {
        message: "Enter instructions for contributing:",
        name: "contribute"
    }]);
}

function generateReadme(answers) {
return `# ${answers.title}

## Description
${answers.description}

<hr>

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributions](#contributions)

<hr>

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributions
${answers.contribute}

`
}

promptUser().then(function(answers){
    const readme=generateReadme(answers);
    
    return writeFileAsync("README.md", readme);
}).then(function(){
    console.log("Successfully created README");
}).catch(function(err){
    console.log(err);
});