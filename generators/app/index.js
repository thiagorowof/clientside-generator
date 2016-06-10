'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');

_.str = require('underscore.string');

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
        message : 'Client\'s name:',
        validate: function(value) {
          value = _.str.trim(value);
          if (_.isEmpty(value)) {
            return 'Please enter a name';
          }
          return true;
        }
      },
      {
        type    : 'input',
        name    : 'git',
        message : 'Github username or organization:',
        filter: val => val.toLowerCase()
      },
      {
        type    : 'list',
        name    : 'uiframework',
        default: 0,
        message: 'Choose your UI Framework:',
        choices: ['None', 'Angular Material', 'Angular UI Bootstrap'],
        filter: val => val.toLowerCase()
      },
      {
        type: 'checkbox',
        name: 'modules',
        message: 'Which Angular modules would you like to include?',
        choices: [
          {
            value: 'animateModule',
            name: 'angular-animate.js',
            checked: false
          },
          {
            value: 'ariaModule',
            name: 'angular-aria.js',
            checked: false
          },
          {
            value: 'cookiesModule',
            name: 'angular-cookies.js',
            checked: false
          },
          {
            value: 'resourceModule',
            name: 'angular-resource.js',
            checked: false
          },
          {
            value: 'messagesModule',
            name: 'angular-messages.js',
            checked: false
          },
          {
            value: 'sanitizeModule',
            name: 'angular-sanitize.js',
            checked: false
          },
          {
            value: 'touchModule',
            name: 'angular-touch.js',
            checked: false
          }
        ]
      },
      {
        type: 'list',
        name: 'stylesheet',
        default: 0,
        message: 'What would you like to write stylesheets with?',
        choices: ['CSS', 'Sass', 'Less'],
        filter: val => val.toLowerCase()
      }
    ]).then(function (answers) {
       this.props = answers;
      this.log('App\'s name:', answers.uiframework);
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
      {
        title: this.props.name,
        description: this.props.description,
        uiframework: this.props.uiframework
      }
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('app/main.js'),
      {name: this.props.name, uiframework: this.props.uiframework}
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        name: this.props.name,
        uiframework: this.props.uiframework
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
