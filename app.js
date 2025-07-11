require('dotenv').config();
const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiroutes');

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
