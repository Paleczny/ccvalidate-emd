import express, {Request, Response,} from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/validate', (req: Request, res: Response) => {
    const {ccNumber} = req.body;

    // Adding timeout to slow the response down to showcase the loading on the frontend
    setTimeout(() => {
    if (!ccNumber || typeof ccNumber !== "string") {
      res.status(400).json({ error: "Invalid input" })
    } else {
      const isValid = luhnCheck(ccNumber)
      res.json({ isValid })
    }
  }, 1000)

})

function luhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    // Process digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (isNaN(digit)) {
            return false; // Invalid character found
        }

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
