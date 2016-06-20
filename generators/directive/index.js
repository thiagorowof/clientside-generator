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

  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('generator-clientside') + ' generator!'
    ));

    this.prompt([
      {
        type    : 'input',
        name    : 'directiveName',
        message : 'What is your directive\'s name?',
        filter: val => val.toLowerCase(),
        validate: function(value) {
          value = _.str.trim(value);
          if (_.isEmpty(value)) {
            return 'Please enter a name';
          }
          return true;
        }
      },
      {
        type    : 'confirm',
        name: 'directiveType',
        message: 'Would you like to save your directive in a custom folder?',
        default: 'Y/n'
      },
      {
        when: function(props) { return (/true/i).test(props.directiveType); },
        type: 'input',
        name: 'directiveFolder',
        message: 'Where do you save it?',
        filter: val => val.toLowerCase()
      }
    ]).then(function (answers) {
      this.props = answers;
      if(!this.props.directiveType){
        this.props.directiveFolder = 'commom'
      }
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('../../app/templates/modules/commom/directive/_directive.js'),
        this.destinationPath('app/modules/'+this.props.directiveFolder+'/directives/'+this.props.directiveName+'/'+this.props.directiveName+'.js'),
      {
        appName: this.appname,
        directiveName: this.props.directiveName
      }
    );
  },

  addJsIndex: function(){
    angularUtils.rewriteFile({
        file: path.join('app/index.html'),
        needle: '<!-- inject:js -->',
        splicable: [
          '<script src="modules/'+this.props.directiveFolder+'/directives/'+this.props.directiveName+'/'+this.props.directiveName+'.js"></script>'
        ]
    });
  },

  // install: function () {
  //   this.installDependencies();
  // }

});
