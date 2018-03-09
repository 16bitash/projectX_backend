const route = require('express').Router();
const Designs = require('../database/modles').designs;
const DatabaseAPIClass = require('./functions').databaseAPI;
const APIHelperFunctions = new DatabaseAPIClass(Designs);

route.get('/', (req, res) => {
    APIHelperFunctions.getSpecificData('designId', req.query.designId).then(data => res.send(data));
});

route.get('/all', (req, res) => {
    APIHelperFunctions.getAllData().then(allDesigns => res.send(allDesigns));
});

route.post('/', (req, res) => {
    insertFileNameInDesignAttributes(req);
    APIHelperFunctions.addRow(req.body).then(newDesign => res.send(newDesign));
});

route.put('/:userId', (req, res) => {
    insertFileNameInDesignAttributes(req);
    APIHelperFunctions.updateRow('designId', req.params.designId, req.body)
        .then(updatedInformation => res.send(updatedInformation));
});

route.delete('/:designId', (req, res) => {
    deleteImagesByDesignId(req.params.designId);
    APIHelperFunctions.deleteRow('designId', req.params.designId).then(deletedDesign => res.send(deletedDesign));
});

function insertFileNameInDesignAttributes(req) {
    if (req.body.designAttributes) {
        let designAttributes = JSON.parse(req.body.designAttributes);
        designAttributes.images.forEach((element, index) => {
            element.name = req.files[index].filename;
        });
        req.body.designAttributes = JSON.stringify(designAttributes);
    }
}

function deleteImagesByDesignId(designId) {
    APIHelperFunctions.getSpecificData('designId', designId).then(data => {
        // TODO
        console.log(data);
    })
}

exports.route = route;