var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();
var upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req,res) {

  const file = req.file;


  if (!file) {
    return res.status(400).json({ error: 'No file uploaded'})
  }

  const {originalname, mimetype, size } = file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });

});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
