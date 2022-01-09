const Course = require('../models/Course');

class MeController {
    // [GET] /stored/courses  khóa học của tôi  - lấy thông tin khóa học và đếm số thủng rác đã xóa gộp nhóm (mongoose-delete)
    // storedCourses(req, res, next) {
    //     Course.find({}).lean()
    //         .then((courses) => {
    //             res.render('me/stored-courses', {
    //                 courses
    //             });
    //         })
    //         .catch(next);
    // }

    storedCourses(req, res, next) {
        Promise.all([Course.find({}).lean(), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses
                }),
            )
            .catch(next);
    }


    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({}).lean()
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses
                }),
            )
            .catch(next);
    }

}

module.exports = new MeController();