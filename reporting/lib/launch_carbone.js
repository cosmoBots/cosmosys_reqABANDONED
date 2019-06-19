'use strict';

const fs = require('fs');
const carbone = require('carbone');

let rawdata = fs.readFileSync('./reporting/doc/reqs.json');  
let data = JSON.parse(rawdata);  

  carbone.render('./reporting/templates/reqs_template.odt', data, function(err, result){
    if (err) return console.log(err);
    fs.writeFileSync('./reporting/doc/reqs_report.odt', result);
  });

  carbone.render('./reporting/templates/reqs_template.ods', data, function(err, result){
    if (err) return console.log(err);
    fs.writeFileSync('./reporting/doc/reqs_report.ods', result);
  });
