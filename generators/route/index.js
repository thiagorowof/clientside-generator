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
    var coffee = this.env.options.coffee;

    if (!this.foundWhenForRoute) {
        this.on('end', function () {
            this.log(chalk.yellow(
                    '\nangular-ui-router is not installed. Skipping adding the route to ' +
                    'scripts/app.' + (coffee ? 'coffee' : 'js')
            ));
        });
        return;
    }

    this.state = this.props.moduleName;
    if (this.options.state) {
        this.state = this.options.state;
    }

    var _name = this.appname.toLowerCase();

    var config = {
        file: path.join('app/modules/app.js'),
        needle: '$stateProvider',
        splicable: [
                "  url: '/" + this.state + "'",
                "  templateUrl: 'modules/" + this.props.moduleName.toLowerCase() + "/view/" +
                this.props.moduleName +".html'",
                "  controller: '" + this.state + "Controller'"
        ]
    };

    config.splicable.unshift(".state('" + this.state + "', {");
    config.splicable.push("})");

    angularUtils.rewriteFile(config);
  },

  install: function () {
    this.installDependencies();
  }
});
