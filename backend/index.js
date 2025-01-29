const app = require('./app'); // Correctly require the app module
require('dotenv').config();
const config = require('./utils/config'); // Ensure config is also required


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
