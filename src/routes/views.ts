import express from "express"
import { requireAuth } from "../middleware/auth"
import { r } from "../lib/html"
import { Home } from "../views/home"
import { Notes } from "../views/notes"
import { Login } from "../views/login"
import { Register } from "../views/register"

export const views = express.Router()

// Home view
views.get("/", (req, res) => {
  r(res, Home())
})

// Notes view
views.get("/notes", requireAuth, (req, res) => {
  r(res, Notes(req.session.user!))
})

// Login view
views.get("/login", (req, res) => {
  r(res, Login())
})

// Register view
views.get("/register", (req, res) => {
  r(res, Register())
})
