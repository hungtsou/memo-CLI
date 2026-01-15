import {jest} from '@jest/globals'

jest.unstable_mockModule('../src/db.js', () => ({
  getDB: jest.fn(),
  saveDB: jest.fn(),
  insertDB: jest.fn()
}))

const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
} = await import('../src/services/notes.js')
const {insertDB, getDB} = await import('../src/db.js')

test('createNote should return new note', async () => {
  const data = {
    id: 1,
    content: 'test note',
    tags: ['test']
  }

  insertDB.mockResolvedValue(data)

  const newNote = await createNote({
    content: 'test note',
    tags: ['test']
  })

  expect(newNote).toEqual(data)
})

test('getAllNotes should return all notes', async () => {
  const data = {
    notes: [
      {
        id: 1,
        content: 'test note',
        tags: ['test']
      }
    ]
  }

  getDB.mockResolvedValue(data)
  const notes = await getAllNotes()
  expect(notes).toEqual(data.notes)
})

test('getNoteById should return note with same id', async () => {
  const data = {
    notes: [
      {
        id: 1,
        content: 'test note',
        tags: ['test']
      }
    ]
  }
  getDB.mockResolvedValue(data)
  const note = await getNoteById(data.notes[0].id)
  expect(note).toEqual(data.notes[0])
})

test('updateNote should return updated note', async () => {
  const data = {
    notes: [
      {
        id: 1,
        content: 'test note',
        tags: ['test']
      }
    ]
  }
  getDB.mockResolvedValue(data)
  const note = await updateNote(data.notes[0].id, {
    content: 'updated note',
    tags: ['test', 'updated']
  })
  expect(note).toEqual(data.notes[0])
})

test('deleteNote should return null if note is not found', async () => {
  const data = {
    notes: [
      {
        id: 1,
        content: 'test note',
        tags: ['test']
      }
    ]
  }
  getDB.mockResolvedValue(data)
  const note = await deleteNote(2)
  expect(note).toBeNull()
})
