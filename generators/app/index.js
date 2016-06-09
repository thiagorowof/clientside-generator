'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the epic ' + chalk.red('generator-clientside') + ' generator!'
    ));

    this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'What is your app\'s name?',
        default : this.appname // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Describe your app:'
      },
      {
        type    : 'input',
        name    : 'client',
        message : 'Client\'s name:'
      },
      {
        type    : 'input',
        name    : 'git',
        message : 'Github username or organization:'
      },
      {
        type    : 'confirm',
        name    : 'cool',
        message : 'Would you like to enable the Cool feature?'
      }]).then(function (answers) {
      this.props = answers;
      this.log('App\'s name:', answers.name);
      this.log('Description:', answers.description);
      this.log('Client\'s Name:', answers.client);
      this.log('Git:', answers.git);
      this.log('Cool feature:', answers.cool);
      done();
    }.bind(this));
  },

  // scaffoldFolders: function(){
  //   this.mkdirp("app");
  //   this.mkdirp("app/assets");
  //   this.mkdirp("app/assets/fonts");
  //   this.mkdirp("app/assets/img");
  //   this.mkdirp("app/assets/js");
  //   this.mkdirp("app/assets/styles");
  //   this.mkdirp("app/modules");
  //   this.mkdirp("app/modules/nomeModulo");
  //   this.mkdirp("app/modules/nomeModulo/controllers");
  //   this.mkdirp("app/modules/nomeModulo/factories");
  //   this.mkdirp("app/modules/nomeModulo/i18n");
  //   this.mkdirp("app/modules/nomeModulo/partials");
  //   this.mkdirp("app/modules/nomeModulo/services");
  //   this.mkdirp("app/modules/nomeModulo/views");
  //   this.mkdirp("dist");
  // },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {package: this.props.name}
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('app/index.html'),
      {title: this.props.description}
    );
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {package: this.props.name}
    );
    // this.fs.copy(
    //   this.templatePath('bowerrc'),
    //   this.destinationPath('.bowerrc')
    // );
  },

  install: function () {
    this.installDependencies();
  }
});
