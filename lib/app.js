const express = require('express');
const app = express();

app.use(require('cors')());
app.use(express.json());

app.use('/api/v1/jobs', require('./routes/jobs'));
app.use('/api/v1/notes', require('./routes/notes'));
app.use('/api/v1/assets', require('./routes/assets'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
