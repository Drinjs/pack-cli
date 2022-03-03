#! /usr/bin/env babel-node

const program = require('commander')
const { version } =  require('./package.json')
const pack = require('./src/index')

program.name('packer')
    .description('pack project by webpack as you like')
    .version(version)

program.command('build [mod...]')
    .option('-w, --watch', 'watch bundle', false)
    .option('-e, --external <type>', 'bundle mode: external or not', 'window')
    .action((mod, command)=> {
        pack(mod, command)
    })

program.parse(process.argv)
