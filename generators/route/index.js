'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');

_.str = require('underscore.string');

module.exports = yeoman.Base.extend({

  default: function(){

    var match = require('fs').readFileSync(path.join('app/modules/app.js'), 'utf-8').match(/\.state/);

    if (match !== null) {
      this.foundWhenForRoute = true;
    }

  },

  prompting: function () {
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

  rewriteAppJs: function(){
    angularUtils.rewriteFile({
        file: path.join('app/modules/app.js'),
        needle: '$stateProvider',
        splicable: [
          '.state("' + this.props.moduleName.toLowerCase() +'", {',
          '  url: "/' + this.props.moduleName + '"',
          '  templateUrl: "modules/' + this.props.moduleName.toLowerCase() + '/view/' +
          this.props.moduleName +'.html"',
          '  controller: "' + this.props.moduleName.toLowerCase() + 'Controller"',
          '})'
        ]
    });
  },

  addJsIndex: function(){
    angularUtils.rewriteFile({
        file: path.join('app/index.html'),
        needle: '<!-- inject:js -->',
        splicable: [
          '<script src="modules/' + this.props.moduleName.toLowerCase() + '/controllers/' + this.props.moduleName + '.js"></script>'
        ]
    });
  },

  // install: function () {
  //   this.installDependencies();
  // }
});
