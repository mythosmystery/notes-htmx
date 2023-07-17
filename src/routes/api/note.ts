import express, { Request, Response } from 'express'
import { Note } from '../../models/Note'
import { html } from '../../lib/html'
import { NotePreview } from '../../views/components/notePreview'
import { User } from '../../models/User'
import { NoteItem } from '../../views/components/noteItem'
import { cache, invalidate } from '../../lib/redis'
import { getNote, getUser } from '../../lib/cached'

export const note = express.Router()

note.post('/notes/new', async (req, res) => {
  try {
    const note = await Note.create({
      title: 'New Note',
      slug: 'new-note',
      content: 'Write your thoughts here...',
      user: { id: req.session.user?.id },
    }).save()

    await getUser.invalidate(req.session.user?.id)

    const user = await getUser(req.session.user?.id)

    if (!user) return makeNotesError(req, res)

    req.session.user = user

    res.setHeader('HX-Trigger', JSON.stringify({ toastSuccess: 'Note saved' }))

    return res.send(makeNotes(user.notes))
  } catch (e) {
    console.log(e)
    return makeNotesError(req, res)
  }
})

note.get('/notes/:id', async (req, res) => {
  const noteId = req.params.id
  const editMode = req.query.edit === 'true'

  const note = await getNote(+noteId)

  if (!note) return res.send(NotePreview(req.session.user?.notes[0]!, editMode))

  return res.send(NotePreview(note, editMode))
})

note.post('/notes/save/:id', async (req, res) => {
  const noteId = req.params.id
  try {
    const { affected } = await Note.update(
      { id: +noteId },
      { ...req.body, slug: req.body.title.toLowerCase().replace(/\s/g, '-') },
    )

    if (!affected) return makeNotesError(req, res)

    await getUser.invalidate(req.session.user?.id)
    getNote.invalidate(+noteId)

    const user = await getUser(req.session.user?.id)

    if (!user) return makeNotesError(req, res)

    req.session.user = user

    res.setHeader('HX-Trigger', JSON.stringify({ toastSuccess: 'Note saved' }))

    return res.send(makeNotes(user.notes))
  } catch (e) {
    console.log(e)
    return makeNotesError(req, res)
  }
})

note.delete('/notes/:id', async (req, res) => {
  const noteId = req.params.id
  try {
    await Note.delete({ id: +noteId })

    await getUser.invalidate(req.session.user?.id)

    const user = await getUser(req.session.user?.id)

    if (!user) return makeNotesError(req, res)

    req.session.user = user

    res.setHeader(
      'HX-Trigger',
      JSON.stringify({ toastSuccess: 'Note deleted' }),
    )

    return res.send(makeNotes(user.notes))
  } catch (e) {
    console.log(e)
    return makeNotesError(req, res)
  }
})

const makeNotes = (notes: Note[]) => html`${notes.map(NoteItem).join('')}`

const makeNotesError = (req: Request, res: Response, msg?: string) => {
  res.setHeader(
    'HX-Trigger',
    JSON.stringify({ toastError: msg || 'An error occurred' }),
  )
  res.send(html`${makeNotes(req.session.user?.notes || [])}`)
}
