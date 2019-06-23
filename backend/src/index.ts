import express from 'express';
import api from './routes/api';
const app = express();

app.use('/api', api);

const port = 3000;
app.listen(port, () => { console.log(`Server running on port ${port}...`); });
export default app;
