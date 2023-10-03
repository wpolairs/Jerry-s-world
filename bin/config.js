export const TAGS = [{
  name: 'title',
  type: 'input',
  message: 'Article title:',
  default: 'post'
},
{
  name: 'postSlug',
  type: 'input',
  message: 'Article post slug:',
  default: 'postSlug'
},
{
  name: 'featured',
  type: 'confirm',
  message: 'Is the type of article featured?',
  default: true,
},
{
  name: 'draft',
  type: 'confirm',
  message: 'Is it a draft?',
  default: false
},
{
  name: "tags",
  type: "checkbox",
  message: 'Please select the tags of the article!',
  default: ['Docs'],
  choices: [
    {
      name: 'Docs',
      value: 'Docs'
    },
    {
      name: 'Git',
      value: 'Git'
    },
    {
      name: 'ReactJS',
      value: 'ReactJS'
    },
    {
      name: 'VueJS',
      value: 'VueJS'
    },
    {
      name: 'Typescript',
      value: 'Typescript'
    },
    {
      name: 'Javascript',
      value: 'Javascript'
    },
    {
      name: 'CSS',
      value: 'CSS'
    },
    {
      name: 'HTML',
      value: 'HTML'
    },
  ]
},
{
  name: "description",
  type: "input",
  message: "Describe the content of the passage:"
}
]