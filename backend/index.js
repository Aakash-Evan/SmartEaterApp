import express from 'express';
import cors from "cors";

const app = express();
app.use(cors());

app.get("/getData", (req, res) => {
    res.send("The Salad");
  })

app.listen(5001, () => console.log("Server running on port 5001"));