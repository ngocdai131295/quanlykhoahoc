const Course = require('../models/Course');

class CourseController {
    // [GET] /courses/:slug   --  lấy thông tin chi tiết của 1 khóa học
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug }).lean()
            .then((courses) =>
                res.render('courses/show', {
                    courses
                }),
            )
            .catch(next);
    }
    // 1=============================  thêm  =====================================================
    // [GET] /courses/create  - giao diện trang thêm mới    
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store - thêm mới khóa học đã hoàn thành
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => { });
    }
    // 1============================= hết phần thêm========================================================


    // 2 =============================sửa cập nhập===============================================
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id).lean()
            .then((course) =>
                res.render('courses/edit', {
                    course
                }),
            )
            .catch(next);
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // 2 ============================= hết phần sửa cập nhập================================================



    // [DELETE] /courses/:id   xóa khóa học tạm vào trong thùng rác ( mongoose-delete)
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force  Xóa khóa học vĩnh viễn trong thùng rác
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore   khôi phục dữ liệu trong thùng rác
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

}


module.exports = new CourseController();