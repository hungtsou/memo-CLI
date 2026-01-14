import {getDB, saveDB, insertDB} from '../db.js'

/**
 * Create a new note
 * @param {Object} noteData - The note data to create
 * @param {string} noteData.content - The content of the note
 * @param {string[]} [noteData.tags] - Optional tags for the note
 * @returns {Promise<Object>} The created note with generated ID and timestamps
 */
export const createNote = async noteData => {
  const note = {
    id: Date.now().toString(),
    content: noteData.content,
    tags: noteData.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  return await insertDB(note)
}

/**
 * Read all notes
 * @returns {Promise<Array>} Array of all notes
 */
export const getAllNotes = async () => {
  const db = await getDB()
  return db.notes
}

/**
 * Read a note by ID
 * @param {string} id - The ID of the note to retrieve
 * @returns {Promise<Object|null>} The note if found, null otherwise
 */
export const getNoteById = async id => {
  const db = await getDB()
  return db.notes.find(note => note.id === id) || null
}

/**
 * Update an existing note
 * @param {string} id - The ID of the note to update
 * @param {Object} updates - The fields to update
 * @param {string} [updates.content] - Updated content
 * @param {string[]} [updates.tags] - Updated tags
 * @returns {Promise<Object|null>} The updated note if found, null otherwise
 */
export const updateNote = async (id, updates) => {
  const db = await getDB()
  const noteIndex = db.notes.findIndex(
    note => note.id === id
  )

  if (noteIndex === -1) {
    return null
  }

  db.notes[noteIndex] = {
    ...db.notes[noteIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  }

  await saveDB(db)
  return db.notes[noteIndex]
}

/**
 * Delete a note by ID
 * @param {string} id - The ID of the note to delete
 * @returns {Promise<Object|null>} The deleted note if found, null otherwise
 */
export const deleteNote = async id => {
  const db = await getDB()
  const noteIndex = db.notes.findIndex(
    note => note.id === id
  )

  if (noteIndex === -1) {
    return null
  }

  const deletedNote = db.notes[noteIndex]
  db.notes.splice(noteIndex, 1)
  await saveDB(db)
  return deletedNote
}

/**
 * Find notes by content
 * @param {string} content - The content to search for
 * @returns {Promise<Array>} Array of notes that match the content
 */
export const findNotesByContent = async content => {
  const db = await getDB()
  return db.notes.filter(note =>
    note.content.includes(content)
  )
}
