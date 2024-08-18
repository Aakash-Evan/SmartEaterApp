import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

const app = express();
app.use(cors());
app.use(express.json());

// Define a meal schema
const mealSchema = new mongoose.Schema({
    user: String,
    name: String,
    date: String,
    time: String,
    numMealItems: Number,
    mealItems: [
        {
            name: String,
            description: String,
            unit: String,
            amount: Number,
        }
    ]
});

// Create a model based on the schema
const Meal = mongoose.model('Meal', mealSchema);

// GET endpoint to retrieve meals
app.get('/getData', async (req, res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (error) {
        console.error('Error retrieving meals:', error);
        res.status(500).send('Error retrieving meals');
    }
});

// POST endpoint to log a new meal
app.post('/logMeal', async (req, res) => {
    try {
        const { userEmail, name: mealName, date: mealDate, time: mealTime, items: mealItems } = req.body.meal;
        const meal = new Meal({ 
            user: userEmail,
            name: mealName,
            date: mealDate,
            time: mealTime,
            numMealItems: mealItems.length,
            mealItems: mealItems
        });
        await meal.save();
        res.status(200).send({ message: 'Meal logged successfully' });
        console.log('Meal logged successfully');
    } catch (error) {
        console.error('Error logging meal:', error);
        res.status(500).send('Error logging meal');
    }
});

app.listen(5001, () => console.log('Server running on port 5001'));
