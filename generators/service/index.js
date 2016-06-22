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
        name    : 'serviceName',
        message : 'What is your service\'s name?',
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
        name: 'serviceType',
        message: 'Would you like to save your service in a custom folder?',
        default: 'Y/n'
      },
      {
        when: function(props) { return (/true/i).test(props.serviceType); },
        type: 'input',
        name: 'serviceFolder',
        message: 'Where do you save it?',
        filter: val => val.toLowerCase()
      }
    ]).then(function (answers) {
      this.props = answers;
      if(!this.props.serviceType){
        this.props.serviceFolder = 'commom'
      }
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('../../app/templates/modules/commom/service/_service.js'),
        this.destinationPath('app/modules/'+this.props.serviceFolder+'/services/'+this.props.serviceName+'/'+this.props.serviceName+'.js'),
      {
        appName: this.appname,
        serviceName: this.props.serviceName
      }
    );
  },

  addJsIndex: function(){
    angularUtils.rewriteFile({
        file: path.join('app/index.html'),
        needle: '<!-- inject:js -->',
        splicable: [
          '<script src="modules/'+this.props.serviceFolder+'/services/'+this.props.serviceName+'/'+this.props.serviceName+'.js"></script>'
        ]
    });
  },

  // install: function () {
  //   this.installDependencies();
  // }

});
