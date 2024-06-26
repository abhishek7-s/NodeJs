const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin , Course } = require("../db");
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username,
        password
    })
    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const img = req.body.img
    const price = req.body.price

    const newCourse = await Course.create({
        title: title,
        description: description,
        img: img,
        price: price,  
    })

    res.json({
        msg : `Course Created successfully, CourseId ${newCourse._id}`
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({})
    res.json({
        Courses : courses
    })
});

module.exports = router;