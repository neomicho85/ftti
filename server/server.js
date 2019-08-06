const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

const PORT = 9000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/budget', routes);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT || PORT}`);
})