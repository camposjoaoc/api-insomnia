import express from 'express';
const app = express();

const PORT = 3000;

//Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to our Developer API!');
});

app.get('/greet', (req, res) => {
    res.send('Hello Developer!');
});
// Array to store developer information
const developers = [
    { id: 1, name: "John", age: 27 }
];

app.get('/developer', (req, res) => {
    res.json(developers);
});

app.post('/developer', (req, res) => {
    const { id, name, age } = req.body;

    // Validate input fields
    if (!id || !name || !age) {
        return res.status(400).json({ message: "All fields (id, name, age) are required." });
    }

    // Check if ID already exists in the array of developers. If it does, return a conflict error.
    const idExists = developers.some(dev => dev.id === id);
    if (idExists) {
        return res.status(409).json({ message: `A developer with ID ${id} already exists.` });
    }

    // Add developer in the array
    developers.push({ id, name, age });
    res.status(201).json({ message: `Hello ${name}! You are ${age} years old`, developer: { id, name, age } });
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});