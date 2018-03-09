class databaseAPI {
    constructor(database) {
        this.database = database;
    }

    getAllData() {
        return this.database.findAll();
    }

    getMultipleData(searchParameters) {
        return this.database.findAndCountAll({where: searchParameters});
    }

    getSpecificData(identifierColumnName, identifierValue) {
        let identifierObj = {};
        identifierObj[identifierColumnName] = identifierValue;
        return this.database.findOne({where: identifierObj});
    }

    addRow(newRowInformation) {
        return this.database.create(newRowInformation);
    }

    updateRow(identifierColumnName, identifierValue, newInformation) {
        let identifierObj = {};
        identifierObj[identifierColumnName] = identifierValue;
        return new Promise((resolve, reject) => {
            this.database.update(newInformation, {where: identifierObj})
                .then(() => this.database.findOne({where: identifierObj}))
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

    deleteRow(identifierColumnName, identifierValue) {
        let identifierObj = {};
        identifierObj[identifierColumnName] = identifierValue;
        return new Promise((resolve, reject) => {
            let deletedRow;
            this.database.findOne({where: identifierObj})
                .then(rowToBeDeleted => {
                    deletedRow = rowToBeDeleted;
                    return this.database.destroy({where: identifierObj})
                })
                .then(() => resolve(deletedRow))
                .catch(err => reject(err));
        })
    }
}

exports.databaseAPI = databaseAPI;