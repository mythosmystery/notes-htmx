import express from 'express'
import { auth } from './auth'
import { note } from './note'

export const api = express.Router()

api.use('/', auth)

api.use('/', note)
