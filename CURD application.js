// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crudDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define schema and model
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', itemSchema);

// Create
app.post('/add', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.send(newItem);
});

// Read
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

// Update
app.put('/update/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.send(updatedItem);
});

// Delete
app.delete('/delete/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.send({ message: 'Item deleted' });
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
