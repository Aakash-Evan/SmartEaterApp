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
    const { mealName } = req.body;
    console.log('Received meal name:', mealName);
    meals.push({ name: mealName, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }); // Add the meal to the list
    res.status(200).send({ message: 'Meal logged successfully' });
});

app.listen(5001, () => console.log('Server running on port 5001'));
