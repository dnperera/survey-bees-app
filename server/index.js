const express = require('express');
require('./services/passport');
//const authRoutes = require('./routes/authRoutes');

const app = express();
//authRoutes(app);
require('./routes/authRoutes')(app);

//let passport knows , we goingto use google strategy as auth method
const PORT = process.env.PORT || 5000;

app.listen(PORT);
