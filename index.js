const inquirer = require ("inquirer");
const fs = require ("fs");
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile);


//Acquiring user inputs for README.md file
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Repository title: ",
            name: "title",
        },
        {
            type: "input",
            message: "Enter description: ",
            name: "description",
        },
        {
            type: "input",
            message: "Installation instructions: ",
            name: "installation",
        },
        {
            type: "input",
            message: "Usage information: ",
            name: "usage",
        },
        {
            type: "input",
            message: "Select license for your application: ",
            name: "license",
            choices: ["MIT", "ISC",  "GNU GPLv3", "Apache-2.0", "BSD-3-Clause"],
            default: "MIT",
        },
        {
            type: "input",
            message: "Contribution details: ",
            name: "contributing",
            default: "To contribute to code base, please refer to (https://github.com/microsoft/vscode/wiki/How-to-Contribute)"
        },
        {
            type: "input",
            message: "Test instructions: ",
            name: "tests",
        },
        {
            type: "input",
            message: "What is your Github unsername?",
            name: "github",
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
        }
    ])
}

//Acquiring badges and generating README file based on user input
function generateReadMe (answers) {
    let license = ""

    if (answers.license === "MIT") {
        license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (answers.license === "ISC") {
        license = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
    } else if (answers.license === "GNU GPLv3") {
        license = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (answers.license === "Apache-2.0") {
        license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (answers.license === "BSD-3-Clause") {
        license = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
    }
    return `
##Title
${answers.title}
${license}

##Table of Contents
[Description](#Description)
[Installation](#Installation)
[Usage](#Usage)
[License](#License)
[Contributing](#Contributing)
[Tests](#Tests)
[Questions](#questions)

##Description
${answers.description}

##Installation
${answers.installation}

##Usage
${answers.usage}

##License
Licensed under ${answers.license}

##Contributing
${answers.contributing}

##Tests
${answers.tests}

##Questions
${answers.questions}

Github: ${answers.github}
Email:  ${answers.email}
    
    `;
}

promptUser()
    .then(function(answers) {
        const readME = generateReadMe(answers);

        return writeFileAsync("README.md", readME);
    })
    .then(function() {
        console.log("Successfully generated README.md file");
    })
      .catch(function(err) {
        console.log(err);
    });