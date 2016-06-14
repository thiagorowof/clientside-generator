'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');

module.exports = yeoman.Base.extend({
  prompting: function () {
    console.log('prompting - zap2sss');
    console.log(this.appname);
    console.log(this.name);

    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('generator-clientside') + ' generator!'
    ));

    this.prompt([
      {
        type    : 'input',
        name    : 'moduleName',
        message : 'What is your module\'s name?',
        filter: val => val.toLowerCase(),
        validate: function(value) {
          value = _.str.trim(value);
          if (_.isEmpty(value)) {
            return 'Please enter a name';
          }
          return true;
        }
      }
    ]).then(function (answers) {
      this.props = answers;
      //this.log('App\'s name:', this.moduleName);
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('../../app/templates/modules/commom/controllers/_controller.js'),
      this.destinationPath('app/modules/'+this.props.moduleName+'/controllers/'+this.props.moduleName+'.js'),
      {
        appName: this.appname,
        moduleName: this.props.moduleName
      }
    );

    this.fs.copyTpl(
      this.templatePath('../../app/templates/modules/commom/view/_view.html'),
      this.destinationPath('app/modules/'+this.props.moduleName+'/view/'+this.props.moduleName+'.html'),
      {
        moduleName: this.props.moduleName
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
