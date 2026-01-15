import express from 'express'
import open from 'open'
import {getAllNotes} from './services/notes.js'
import fs from 'fs'

const HTML_PATH = new URL('template.html', import.meta.url)
  .pathname

const interpolate = (template, data) => {
  return template.replace(
    /\{\{\s*(\w+)\s*\}\}/g,
    (match, placeholder) => {
      return data[placeholder] || match
    }
  )
}

const formatNotes = notes => {
  return notes
    .map(
      note => `
    <div class="note">
      <p>${note.content}</p>
      <p class="tags">${note.tags && note.tags.length ? note.tags.join(', ') : 'no tags'}</p>
    </div>
    `
    )
    .join('\n')
}

export const startServer = async port => {
  const app = express()
  const HTML_template = fs.readFileSync(HTML_PATH, 'utf8')
  app.use(express.json())

  app.get('/', async (req, res) => {
    const data = await getAllNotes()
    const renderedTemplate = interpolate(HTML_template, {
      notes: formatNotes(data)
    })
    res.send(renderedTemplate)
  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    open(`http://localhost:${port}`)
  })
}
