#! /usr/bin/env node

import { program } from "commander"
import create from './create.js'

program.command("create <blog-name>")
  .description("create a new blog")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((pn, option) => {
    create(pn, option)
  })

// program.command("config [value]")
//   .description("inspect and modify config")
//   .option("-g, --get <path>", "get value from option")
//   .option("-s, --set <path> <value>", "set config")
//   .option("-d, --delete <path>", "delete value from config")
//   .option("-a, --all", "get all config")
//   .action((v, cmd) => {
//     console.log(v, cmd)
//   })

program.usage("[global options] command")


program.parse(process.argv)