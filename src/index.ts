import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { stringify } from 'querystring';
const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.use('/', express.static('static'));

app.use(express.json());

app.post('/create-secret', (req, res) => {
  console.log(req.body);
  const json = JSON.stringify(req.body);
  const id = uuidv4();
  const dataPath = path.resolve(__dirname, '..', 'files', id);
  fs.mkdirSync(dataPath);
  fs.writeFile(path.resolve(dataPath, 'index.json'), json, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ status: 'ok', id: id });
    }
  });
});

app.get('/d/:id', async (req, res) => {
  const id = req.params.id;
  const dataPath = path.resolve(__dirname, '..', 'files', id);
  console.log(dataPath);

  const indexJsonPath = path.resolve(dataPath, 'index.json');
  console.log(indexJsonPath);
  fs.readFile(indexJsonPath, 'utf8', (err, data) => {
    if (err) {
      res.send({ status: 'error', message: 'no such files' });
    } else {
      res.send(JSON.parse(<string>data));
    }
  });

  fs.rmdirSync(dataPath, { recursive: true });
});
