const Course = require('../models/Course');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({}).lean()
            .then((courses) => {
                res.render('home', {
                    // courses: mutipleMongooseToObject(courses),
                    courses

                });
            })
            .catch(next);
    }

    // index(req, res) {
    //     Course.find({}, function (err, courses) {
    //         if (!err) {
    //             res.json(courses);
    //         } else {
    //             res.status(400).json({ error: 'ERROR!!!' });
    //         }
    //     });

    // }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
    // index(req, res) {
    //     res.render('home');
    // }
}

module.exports = new SiteController();