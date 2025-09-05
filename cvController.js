const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'cvs.json');

const readCvs = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const saveCvs = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

exports.getAllCvs = (req, res) => {
    const cvs = readCvs();
    res.json(cvs);
};

exports.getOneCv = (req, res) => {
    const cvs = readCvs();
    const cv = cvs.find(c => c.id === parseInt(req.params.id));
    if (cv) {
        res.json(cv);
    } else {
        res.status(404).json({ message: 'Currículo não encontrado.' });
    }
};

exports.createCv = (req, res) => {
    const cvs = readCvs();
    const newCv = { ...req.body };
    // Gera um ID único simples, o maior ID atual + 1
    const newId = cvs.length > 0 ? Math.max(...cvs.map(c => c.id)) + 1 : 1;
    newCv.id = newId;

    cvs.push(newCv);
    saveCvs(cvs);
    res.status(201).json({ message: 'Currículo criado com sucesso!', cv: newCv });
};

exports.updateCv = (req, res) => {
    const cvs = readCvs();
    const cvIndex = cvs.findIndex(c => c.id === parseInt(req.params.id));

    if (cvIndex !== -1) {
        cvs[cvIndex] = { ...cvs[cvIndex], ...req.body };
        saveCvs(cvs);
        res.json({ message: 'Currículo atualizado com sucesso!' });
    } else {
        res.status(404).json({ message: 'Currículo não encontrado.' });
    }
};

exports.deleteCv = (req, res) => {
    let cvs = readCvs();
    const cvIndex = cvs.findIndex(c => c.id === parseInt(req.params.id));

    if (cvIndex !== -1) {
        cvs.splice(cvIndex, 1);
        saveCvs(cvs);
        res.json({ message: 'Currículo excluído com sucesso!' });
    } else {
        res.status(404).json({ message: 'Currículo não encontrado.' });
    }
};