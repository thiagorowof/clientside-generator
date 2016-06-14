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

      var hasMod = function (mod) { return answers.modules.indexOf(mod) !== -1; };
      this.animateModule = hasMod('animateModule');
      this.ariaModule = hasMod('ariaModule');
      this.cookiesModule = hasMod('cookiesModule');
      this.messagesModule = hasMod('messagesModule');
      this.resourceModule = hasMod('resourceModule');
      this.sanitizeModule = hasMod('sanitizeModule');
      this.touchModule = hasMod('touchModule');

      var angMods = [];

      if (this.animateModule) {
        angMods.push("'ngAnimate'");
      }

      if (this.ariaModule) {
        angMods.push("'ngAria'");
      }

      if (this.cookiesModule) {
        angMods.push("'ngCookies'");
      }

      if (this.messagesModule) {
        angMods.push("'ngMessages'");
      }

      if (this.resourceModule) {
        angMods.push("'ngResource'");
      }

      if (this.sanitizeModule) {
        angMods.push("'ngSanitize'");
      }

      if (this.touchModule) {
        angMods.push("'ngTouch'");
      }

      if (angMods.length) {
        this.angularModules = '\n    ' + angMods.join(',\n    ') + '\n  ';
        this.hasModules = true;
      }

      this.log('App\'s name:', this.hasModules);
      done();
    }.bind(this));
  },

  // scaffoldFolders: function(){
  //   this.mkdir("app");
  // },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {package: this.props.name}
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        title: this.props.name,
        description: this.props.description,
        uiframework: this.props.uiframework
      }
    );
    this.fs.copyTpl(
      this.templatePath('modules/_app.js'),
      this.destinationPath('app/modules/app.js'),
      {
        name: this.props.name,
        uiframework: this.props.uiframework,
        angularModules: this.angularModules,
        hasModules: this.hasModules
      }
    );
    this.fs.copy(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      //ajustar isso para copiar toda a pasta de assets depois
      this.templatePath('assets/styles/main.css'),
      this.destinationPath('app/assets/styles/main.css')
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        name: this.props.name,
        uiframework: this.props.uiframework,
        animateModule: this.animateModule,
        ariaModule: this.ariaModule,
        cookiesModule: this.cookiesModule,
        messagesModule: this.messagesModule,
        resourceModule: this.resourceModule,
        sanitizeModule: this.sanitizeModule,
        touchModule: this.touchModule
      }
    );
    this.fs.copyTpl(
      this.templatePath('modules/main/controllers/mainController.js'),
      this.destinationPath('app/modules/main/controllers/mainController.js'),
      {name: this.props.name, uiframework: this.props.uiframework}
    );
    this.fs.copyTpl(
      this.templatePath('modules/main/views/mainView.html'),
      this.destinationPath('app/modules/main/views/mainView.html'),
      {name: this.props.name, uiframework: this.props.uiframework}
    );

  },

  install: function () {
    this.installDependencies();
  }
});
