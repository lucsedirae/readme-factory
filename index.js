const fs = require("fs");
const inquirer = require("inquirer");
const { title } = require("process");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

console.log("Welcome to README-factory. To generate a professional README enter the requested information.")

promptUser().then(function(answers){
    const readme=generateReadme(answers);
    
    return writeFileAsync("newREADME.md", readme);
}).then(function(){
    console.log("Successfully created README");
}).catch(function(err){
    console.log(err);
});

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
    },
    {
        message: "Enter testing libraries used and commands required to run tests:",
        name: "testing"
    },
    {
        message: "Enter your email address:",
        name: "email"
    },
    {
        message: "Enter your GitHub profile URL:",
        name: "profileLink"
    },
    {
        message: "Enter your GitHub Username: ",
        name: "gitname"
    },
    {
        message: "Enter your GitHub repo name: ",
        name: "repo"
    }]);
}

function generateReadme(answers) {
return `# ${answers.title}

![GitHub](https://img.shields.io/github/license/${answers.gitname}/${answers.repo}?color=39%2C%20255%2C%200%20&style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/${answers.gitname}/${answers.repo}?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/${answers.gitname}/${answers.repo}?style=for-the-badge)

## Description
${answers.description}

<hr>

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributions](#contributions)

* [Testing](#testing)

* [Questions](#questions)

<hr>

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
Created under the ${answers.license} license. See LICENSE.txt for more information.

## Contributions
${answers.contribute}

## Testing
${answers.testing}

## Questions
Have questions on this application? Contact me via:<br>
Email: ${answers.email} <br>
My GitHub Profile: ${answers.profileLink} <br>   
`
}