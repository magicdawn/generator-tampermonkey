const fs = require('fs')
const {basename, join: pathjoin} = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const moment = require('moment')
const debug = require('debug')('yo:magicdawn:app')
const gitconfig = require('git-config')

module.exports = class AppGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)
    debug('constructor arguments %j', arguments)

    // project root
    this.sourceRoot(pathjoin(__dirname, '../..'))

    // require appname
    this.argument('appname', {type: String, required: true, desc: 'the app name'})
  }

  default() {
    this._copyFiles()
    this._copyTpl()
  }

  _copyFiles() {
    // project root
    {
      const files = ['.eslintrc.yml', '.eslintignore', 'prettier.config.js']
      for (let f of files) {
        const from = this.templatePath(f)
        const to = this.destinationPath(this.options.appname + '/' + f)
        this.fs.copy(from, to)
      }
    }

    // tpl
    {
      const files = ['nodemon.json', 'package.json', 'rollup.config.js', 'scripts', 'src']
      for (let f of files) {
        const from = this.templatePath('template/' + f)
        const to = this.destinationPath(this.options.appname + '/' + f)
        this.fs.copy(from, to)
      }
    }

    // .gitignore 特殊
    // https://github.com/npm/npm/issues/3763
    this.fs.copy(
      this.templatePath('template/gitignore'),
      this.destinationPath(this.options.appname + '/' + '.gitignore')
    )
  }

  _copyTpl() {
    const viewBag = {
      name: this.options.appname,
      targetDir: this.destinationPath(this.options.appname),
    }

    _.each(
      {
        'package.json': {},
        'src/banner.user.js': {},
      },
      (v, f) => {
        const from = this.templatePath('template/' + f)
        const to = this.destinationPath(this.options.appname + '/' + f)
        this.fs.copyTpl(from, to, viewBag)
      }
    )
  }
}
