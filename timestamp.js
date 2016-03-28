'use strict';

var express = require('express');

var app = express();

function toNatural(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()] + ' ' + (date.getDate() < 10 ? '0' : '') + date.getDate() + ', ' + date.getFullYear();
}

app.get('/:str', function(req, res) {
    
    var str = req.params.str,
        date = isNaN(+str) ? new Date(str) : new Date(+str * 1000),
        result = {};
    
    if (date == 'Invalid Date') {
        
        result = {
            'unix': null,
            'natural': null
        }
        
    } else {
        
        result = {
            'unix': date.getTime() / 1000,
            'natural': toNatural(date)
        }
    
    }
    
    res.json(result);
    
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
   console.log('Listening on port ' + port + '...'); 
});