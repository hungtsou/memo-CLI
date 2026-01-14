import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'
import {
  createNote,
  getAllNotes,
  getNoteById,
  findNotesByContent,
  updateNote,
  deleteNote
} from './services/notes.js'

yargs(hideBin(process.argv))
  .command(
    'new <note>',
    'create a new note',
    yargs => {
      return yargs.positional('note', {
        describe:
          'The content of the note you want to create',
        type: 'string'
      })
    },
    async argv => {
      const note = await createNote({
        content: argv.note,
        tags: argv.tags ? argv.tags.split(',') : []
      })
      console.log('Note created!', note.id)
    }
  )
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('list', 'list all notes', async () => {
    const notes = await getAllNotes()
    console.log(notes)
  })
  .command(
    'get <id>',
    'get a note by id',
    yargs => {
      return yargs.positional('id', {
        describe: 'The ID of the note you want to get',
        type: 'string'
      })
    },
    async argv => {
      const note = await getNoteById(argv.id)
      console.log(note)
    }
  )
  .command(
    'update <id> <note>',
    'update a note',
    yargs => {
      return yargs
        .positional('id', {
          describe: 'The ID of the note you want to update',
          type: 'string'
        })
        .positional('note', {
          describe:
            'The content of the note you want to update',
          type: 'string'
        })
        .option('tags', {
          alias: 't',
          type: 'string',
          description: 'tags to add to the note'
        })
    },
    async argv => {
      const note = await updateNote(argv.id, {
        content: argv.note,
        tags: argv.tags ? argv.tags.split(',') : []
      })
      console.log('Note updated!', note.id)
    }
  )
  .command(
    'delete <id>',
    'delete a note',
    yargs => {
      return yargs.positional('id', {
        describe: 'The ID of the note you want to delete',
        type: 'string'
      })
    },
    async argv => {
      const note = await deleteNote(argv.id)
      console.log('Note deleted!', note.id)
    }
  )
  .command(
    'find <content>',
    'find notes by content',
    yargs => {
      return yargs.positional('content', {
        describe: 'The content to search for',
        type: 'string'
      })
    },
    async argv => {
      const notes = await findNotesByContent(argv.content)
      console.log(notes)
    }
  )
  .demandCommand(1)
  .parse()
