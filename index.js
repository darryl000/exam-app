const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// mongoose.connect('mongodb://mongo:27017/dashboard' ,{ // pour dockeriser
mongoose.connect('mongodb://localhost:27017/dashboard' ,{ // en local pour demarrer le project
  useNewUrlParser : true,
  useUnifiedTopology: true

} )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Définir un dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

const dataSchema = new mongoose.Schema({
  label: String,
  value: Number,
});
const Data = mongoose.model('Data', dataSchema);

// Route pour afficher les données
app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.render('data', { data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour ajouter des données
app.post('/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.redirect('/data');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
