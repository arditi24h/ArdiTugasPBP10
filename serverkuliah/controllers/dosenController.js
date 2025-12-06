const db = require('../models/db');

exports.getDosen = (req, res) => {
    let { prodi, sort, page, limit } = req.query;

    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM dosen";
    let params = [];

    if (prodi) {
        query += " WHERE prodi = ?";
        params.push(prodi);
    }

    if (sort) {
        query += " ORDER BY " + sort;
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    db.query(query, params, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error menjalankan query" });
        }
        res.json({
            page: page,
            limit: limit,
            data: result
        });
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
        res.json({ message: "Dosen berhasil diperbarui" });
    });
};

exports.deleteDosen = (req, res) => {
    const nidn = req.params.nidn;

    db.query("DELETE FROM dosen WHERE nidn = ?", [nidn], (err, result) => {
        if (err) throw err;
        res.json({ message: "Dosen berhasil dihapus" });
    });
};
