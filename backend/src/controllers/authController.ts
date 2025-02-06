import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user"

dotenv.config()

async function login(req: Request, res: Response): Promise<any> {
  try {
    const { identifier, password } = req.body

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { identifier } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiant ou mot de passe incorrect" })
    }

    const token = jwt.sign({ identifier }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" })

    res.json({ message: "Vous êtes connecté", token })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Erreur interne du serveur" })
  }
}

async function register(req: Request, res: Response): Promise<any> {
  try {
    const { identifier, password } = req.body

    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifiant et mot de passe requis" })
    }

    const userRepository = AppDataSource.getRepository(User)

    const existingUser = await userRepository.findOne({ where: { identifier } })
    if (existingUser) {
      return res.status(400).json({ message: "Cet identifiant est déjà utilisé" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = userRepository.create({ identifier, password: hashedPassword })
    await userRepository.save(newUser)

    res.status(201).json({ message: "Compte créé avec succès", userId: newUser.id })
  } catch (error) {
    console.error("Register error:", error)
    res.status(500).json({ message: "Erreur interne du serveur" })
  }
}


export {
  login,
  register,
}