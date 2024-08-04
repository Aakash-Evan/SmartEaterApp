import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let meals = []; // In-memory array to store meals

app.get('/getData', (req, res) => {
    res.json(meals); // Return the list of meals
});

app.post('/logMeal', (req, res) => {
    const { mealItems } = req.body; // Extract mealItems from the request body
    if (Array.isArray(mealItems)) {
        meals.push(mealItems); // Add the array of mealItems to the meals list
        console.log("Received meal: ");
        res.status(200).send({ message: 'Meals logged successfully' });
    } else {
        res.status(400).send({ message: 'Invalid mealItems format' });
    }
});

app.listen(5001, () => console.log('Server running on port 5001'));
