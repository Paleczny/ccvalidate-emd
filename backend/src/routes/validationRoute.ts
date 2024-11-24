import { Router, Request, Response } from "express"
import { validateCardNumber } from "../services/validationService"

const router = Router()

router.post("/validate", (req: Request, res: Response) => {
  const { ccNumber } = req.body
  setTimeout(() => {
    if (!ccNumber || typeof ccNumber !== "string") {
      res.status(400).json({ error: "Invalid input" })
    }

    try {
      const isValid = validateCardNumber(ccNumber)
      res.json({ isValid })
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }, 1000)
})

export default router
