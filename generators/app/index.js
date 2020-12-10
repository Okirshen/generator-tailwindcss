"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-tailwindcss")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Would you like your tailwindcss project to be called?"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      `${this.templatePath()}/**`,
      this.destinationPath(),
      this.props
    );
  }

  install() {
    this.installDependencies({
      yarn: { force: true },
      npm: false,
      bower: false
    });
    this.spawnCommand("yarn", ["build"]);
  }
};
