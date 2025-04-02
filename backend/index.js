import express from 'express';
import cors from 'cors';
import { urlRouter } from './routes/url.routes.js';
import { swaggerOptions } from './swagger.config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT;
const app = express();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', urlRouter);

app.listen(PORT, console.log('started on 3000'));
