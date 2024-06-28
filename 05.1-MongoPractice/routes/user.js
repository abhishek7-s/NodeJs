const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User , Course} = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    let username = req.body.username
    let password = req.body.password
    await User.create({
        username: username,
        password: password
    })
    res.json({
        msg: "User created Successfully"
    })
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})

    res.json({
        Courses : courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchaseCourses: courseId
        }
    })

    res.json({
        msg: "Cource Purchased Successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    console.log("Hello");
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user);
    const courses = await Course.find({
        _id: {
            "$in": user.purchaseCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router