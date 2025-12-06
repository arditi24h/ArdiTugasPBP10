const express = require('express');
const app = express();
const dosenController = require('./controllers/dosenController');

app.use(express.json());

// Routes
app.get('/dosen', dosenController.getAllDosen);
app.get('/dosen/:nidn', dosenController.getDosenById);
app.post('/dosen', dosenController.addDosen);
app.put('/dosen/:nidn', dosenController.updateDosen);
app.delete('/dosen/:nidn', dosenController.deleteDosen);

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
