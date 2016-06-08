'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the epic ' + chalk.red('generator-clientside') + ' generator!'
    ));

    var prompts = [
      {
        name: 'appName',
        message: 'What is your app\'s name?'
      },
      {
        name: 'appDescription',
        message: 'Describe your app:'
      },
      {
        name: 'appClient',
        message: 'Client:'
      },
      {
        name: 'appGit',
        message: 'Github username or organization:'
      }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  scaffoldFolders: function(){
    this.mkdirp("app");
    this.mkdirp("app/assets");
    this.mkdirp("app/assets/fonts");
    this.mkdirp("app/assets/img");
    this.mkdirp("app/assets/js");
    this.mkdirp("app/assets/styles");
    this.mkdirp("app/modules");
    this.mkdirp("app/modules/nomeModulo");
    this.mkdirp("app/modules/nomeModulo/controllers");
    this.mkdirp("app/modules/nomeModulo/factories");
    this.mkdirp("app/modules/nomeModulo/i18n");
    this.mkdirp("app/modules/nomeModulo/partials");
    this.mkdirp("app/modules/nomeModulo/services");
    this.mkdirp("app/modules/nomeModulo/views");
    this.mkdirp("dist");
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
