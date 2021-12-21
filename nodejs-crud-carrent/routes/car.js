let express = require('express');
let router = express.Router();
let dbCon = require('../lib/db');

// หน้าเว็บ

router.get('/',(req, res, next) => {
    dbCon.query('SELECT * FROM car ORDER BY id ', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('car', { data: ''});
        } else {
            res.render('car', { data: rows});
        }
    })
})

// display add car page
router.get('/add', (req, res, next) => {
    res.render('car/add', {
        name: '',
        license: '',
        brand: '',
        color: '',
        price: '',
        status: '',
        year: '',
        detail: ''
    })
})

// add a new car
router.post('/add', (req, res, next) => {
    let name = req.body.name;
    let name = req.body.name;
    let license = req.body.license;
    let brand = req.body.brand;
    let color = req.body.color;
    let price = req.body.price;
    let status = req.body.status;
    let year = req.body.year;
    let detail = req.body.detail;
    let errors = false;

    if (name.length === 0 || license.length === 0 || brand.length === 0 || color.length === 0 || price.length === 0 || status.length === 0  || year.length === 0 || detail.length === 0 ) {
        errors = true;
        // set flash message
        req.flash('error', 'Please enter name license brand color price status year and detail ');
        // render to add.ejs with flash message
        res.render('car/add', {
            name: name,
            license: license,
            brand: brand,
            color: color,
            price: price,
            status: status,
            year: year,
            detail: detail
        })
    }

    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            license: license,
            brand: brand,
            color: color,
            price: price,
            status: status,
            year: year,
            detail: detail
        }

        // insert query
        dbCon.query('INSERT INTO car SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)

                res.render('car/add', {
                    name: form_data.name,
                    license: form_data.license,
                    brand: form_data.brand,
                    color: form_data.color,
                    price: form_data.price,
                    status: form_data.status,
                    year: form_data.year,
                    detail: form_data.detail
                })
            } else {
                req.flash('success', 'Car successfully added');
                res.redirect('/car');
            }
        })
    }
})

// display edit car page
router.get('/edit/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('SELECT * FROM car WHERE id = ' + id, (err, rows, fields) => {
        if (rows.length <= 0) {
            req.flash('error', 'Car not found with id = ' + id)
            res.redirect('/carrent');
        } else {
            res.render('carrent/edit', {
                title: 'Edit car',
                id: rows[0].id,
                name: rows[0].name,
                license: rows[0].license,
                brand: rows[0].brand,
                color: rows[0].color,
                price: rows[0].price,
                status: rows[0].status,
                year: rows[0].year,
                detail: rows[0].detail
            })
        }
    });
})

// update car page
router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;
    let license = req.body.license;
    let brand = req.body.brand;
    let color = req.body.color;
    let price = req.body.price;
    let status = req.body.status;
    let year = req.body.year;
    let detail = req.body.detail;
    let errors = false;

    if (name.length === 0 || license.length === 0 || brand.length === 0 || color.length === 0 || price.length === 0 || status.length === 0  || year.length === 0 || detail.length === 0 ) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('carrent/edit', {
            id: req.params.id,
            name: name,
            name: name,
            license: license,
            brand: brand,
            color: color,
            price: price,
            status: status,
            year: year,
            detail: detail
        })
    }
    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            name: name,
            license: license,
            brand: brand,
            color: color,
            price: price,
            status: status,
            year: year,
            detail: detail
        }
        // update query
        dbCon.query("UPDATE car SET ? WHERE id = " + id, form_data, (err, result) => {
            if (err) {
                req.flash('error', err);
                res.render('carrent/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    license: form_data.license,
                    brand: form_data.brand,
                    color: form_data.color,
                    price: form_data.price,
                    status: form_data.status,
                    year: form_data.year,
                    detail: form_data.detail
                })
            } else {
                req.flash('success', 'Car successfully updated');
                res.redirect('/carrent')
            }
        })
    }
})

// delete car
router.get('/delete/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('DELETE FROM car WHERE id = ' + id, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/carrent');
        } else {
            req.flash('success', 'Car successfully deleted! ID = ' + id);
            res.redirect('/carrent');
        }
    })
})


module.exports = router;