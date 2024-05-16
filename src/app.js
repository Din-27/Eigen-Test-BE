const cors = require('cors');
const path = require('path')
const express = require('express');
const loadRoutes = require('./helpers/LoadRoutes.helper');
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
loadRoutes(path.join(__dirname, 'http/routes'), app);
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

// module.exports = app; 