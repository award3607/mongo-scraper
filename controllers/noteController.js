var request = require('request');

var db = require('../models');

exports.deleteNote = (req, res) => {
    db.Note.findByIdAndRemove(req.params.id)
    .then(function(dbNote) {
        console.log('Deleted note');
    });
};