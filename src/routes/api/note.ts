import express, { Request } from 'express'
import { Note } from '../../models/Note'
import { html } from '../../lib/html'
import { NotePreview } from '../../views/components/notePreview'
import { User } from '../../models/User'
import { NoteItem } from '../../views/components/noteItem'

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

note.post('/notes/save/:id', async (req, res) => {
  const noteId = req.params.id
  try {
    const { affected } = await Note.update({ id: +noteId }, { ...req.body })

    if (!affected) return res.send(makeNotesError(req))

    const user = await User.findOne({
      where: { id: req.session.user?.id },
      relations: { notes: true },
    })

    if (!user) return res.send(makeNotesError(req))

    req.session.user = user

    return res.send(makeNotes(user.notes))
  } catch (e) {
    console.log(e)
    return res.send(makeNotesError(req))
  }
})

const makeNotes = (notes: Note[]) => html`${notes.map(NoteItem)}`

const makeNotesError = (req: Request, msg?: string) => html`
  ${makeNotes(req.session.user?.notes || [])}
  <div class="text-xl text-red-500">${msg || 'Error saving note'}</div>
`
