'use strict';
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors')

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'test'
    }
});

app.use(cors());
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/api/expenses', jsonParser,  function (req, res) {

    var university = req.body.university;
    var routine = req.body.routine;
    var other = req.body.other;
    var income = req.body.income;
    
    knex('finance').insert({
        university_fees: university.fees,
        university_duration: university.duration,
        university_period: university.period,
        university_book: university.book,
        university_stationary: university.stationary,
        routine_rent: routine.rent,
        routine_auto_installment: routine.auto_installment,
        routine_pers_installment: routine.pers_installment,
        routine_real_taxes: routine.real_taxes,
        routine_other_taxes: routine.other_taxes,
        routine_life_preminum: routine.life_preminum,
        routine_auto_preminum: routine.auto_installment,
        routine_food: routine.food,
        routine_clothing: routine.clothing,
        routine_utility_bills: routine.utility_bills,
        routine_transportation: routine.transportation,
        routine_entertainment: routine.entertainment,
        routine_club_hobbies: routine.club_hobbies,
        routine_services: routine.services,
        routine_medical: routine.medical,
        other_furniture: other.furniture,
        other_electronics: other.electronics,
        other_vacation: other.vacation,
        other_repairs: other.repairs,
        income_federal: income.federal,
        income_federal_years: income.federal_years,
        income_scholarship: income.scholarship,
        income_employment: income.employment,
        income_employment_hours: income.employment_hours,
        income_family_fund: income.family_fund
    }).then(function (result) {
            res.json({ success: true, message: 'ok' }); 
    });
})

app.get('/api/charts', function (req, res) {

    knex.select().table('finance').then(function (result) {
        res.json({ success: true, message: 'ok', data: result });  
    });
    
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});