import express from 'express';
import { route } from './routes'
const app = express();
app.use(express.json())

app.use(route)

app.listen(process.env.port || 3000, () => {
  console.log('Server running on port 3000')
});
