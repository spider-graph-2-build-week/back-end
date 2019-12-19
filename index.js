require('dotenv').config()
const server = require('./api/server.js');

const PORT = process.env.PORT || 3750;
server.listen(PORT, () => console.log(`::: Server Running on Port ${PORT} :::`))