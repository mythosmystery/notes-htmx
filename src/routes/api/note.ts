import express from 'express'
import { Note } from '../../models/Note'
import { html } from '../../lib/html'
import { NotePreview } from '../../views/components/notePreview'

export const note = express.Router()

note.get('/notes/:id', async (req, res) => {
  const noteId = req.params.id
  const editMode = req.query.edit === 'true'

  const note = await Note.findOne({ where: { id: +noteId } })

  if (!note)
    return res.send(html`
      <div class="text-xl text-red-500">Error getting note</div>
    `)

  return res.send(NotePreview(note, editMode))
})
