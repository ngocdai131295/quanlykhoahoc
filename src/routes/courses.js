const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CousreController');


// thêm
router.get('/create', courseController.create);
router.post('/store', courseController.store);

// sửa
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);

// xóa tạm - đi vào thùng rác  ( thư viện mongoose-delete)
router.delete('/:id', courseController.destroy);

// khôi phục dữ liệu và xóa vĩnh viễn- trong thùng rác
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDestroy);

// lấy dữ liệu thông tin chi tiết khóa học
router.get('/:slug', courseController.show);



module.exports = router;