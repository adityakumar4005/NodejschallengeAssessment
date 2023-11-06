const express = require('express');
const app = express();

app.use(express.json()); // Body parsing middleware should come first

// Other middleware can follow

const bookRoutes = require('./src/routes/bookroute');
app.use('/api', bookRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Book_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})