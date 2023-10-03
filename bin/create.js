import path from 'node:path'
import fs from 'node:fs'
import inquirer from 'inquirer'
// import json2md from 'json2md'
import { TAGS } from './config.js'

const blogBaseInfo = {
  author: "Jerry",
  pubDatetime: null,
  title: "",
  postSlug: "",
  featured: true,
  draft: false,
  tags: ['Docs', 'Git', 'ReactJS'],
  description: ""
}

const create = async (projectName, options) => {
  const cwd = process.cwd()
  const fileName = `${projectName}.md`
  const dir = path.join(cwd, 'src/content/blog')
  const targetPath = path.join(dir, fileName)
  console.log(new Date())

  if (fs.existsSync(targetPath)) {
    if (options.force) {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'confirm',
          message: 'Target directory already exists,please choose an action:'
        }
      ])
      if (action) {
        const inputContent = await getContent()
        writeFile(targetPath, { ...blogBaseInfo, ...inputContent }, projectName)
      }
    } else {
      let newFileName = getNewFileName(dir, targetPath)

      while (fs.existsSync(newFileName)) {
        newFileName = getNewFileName(dir, newFileName)
      }
      const inputContent = await getContent()
      writeFile(newFileName, { ...blogBaseInfo, ...inputContent }, projectName)
    }
  } else {
    const inputContent = await getContent()
    writeFile(targetPath, { ...blogBaseInfo, ...inputContent }, projectName)
  }
}

const writeFile = (path, content, fileName) => {
  fs.writeFile(`${path}`, jsonToMd(content), err => {
    if (err) throw err;
    console.log('--------------------successfuly---------------------')
    console.log(`\nThe ${fileName}.md file is created successfully!\n`);
    console.log('--------------------successfuly---------------------')
  });
}

const jsonToMd = (content) => {
  const contentArr = Object.keys(content)
  let res = ``
  for (const key of contentArr) {
    if (Array.isArray(content[key])) {
      let listMd = ''
      content[key].forEach(item => {
        listMd += `\n  - ${item}`
      });
      res = res + `\n${key}: ${listMd}`
    } else {
      res = res + `\n${key}: ${content[key]}`
    }
  }
  return `---${res}
---`
}

const getNewFileName = (dir, path) => {
  const prefixPath = path?.split('.')[0]
  const pathArr = prefixPath.split('/')
  const fileName = pathArr[pathArr.length - 1]
  let curFileOrder = Number(fileName.split('-')[1])
  const fileOrder = isNaN(curFileOrder) ? 0 : curFileOrder

  return `${`${dir}/${fileName.split('-')[0]}-${fileOrder + 1}`}.md`
}

const getContent = async () => {
  const { title, postSlug, featured, draft, tags, description } = await inquirer.prompt(TAGS)
  const pubDatetime = new Date().toISOString()
  return {
    title,
    postSlug,
    featured,
    draft,
    tags,
    description,
    pubDatetime
  }
}

export default create