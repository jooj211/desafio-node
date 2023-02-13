const express = require('express');
const { Application } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
import { router } from './routes';

const app: typeof Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
