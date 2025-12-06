const db = require('../models/db');

exports.getAllDosen = (req, res) => {
    db.query("SELECT * FROM dosen", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

exports.getDosenById = (req, res) => {
    const nidn = req.params.nidn;
    db.query("SELECT * FROM dosen WHERE nidn = ?", [nidn], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

exports.addDosen = (req, res) => {
    const data = req.body;
    db.query("INSERT INTO dosen SET ?", data, (err, result) => {
        if (err) throw err;
        res.json({ message: "Dosen berhasil ditambahkan" });
    });
};

exports.updateDosen = (req, res) => {
    const nidn = req.params.nidn;
    const data = req.body;

    db.query("UPDATE dosen SET ? WHERE nidn = ?", [data, nidn], (err, result) => {
        if (err) throw err;
        res.json({ message: "Data dosen berhasil diupdate" });
    });
};

exports.deleteDosen = (req, res) => {
    const nidn = req.params.nidn;

    db.query("DELETE FROM dosen WHERE nidn = ?", [nidn], (err, result) => {
        if (err) throw err;
        res.json({ message: "Dosen berhasil dihapus" });
    });
};
