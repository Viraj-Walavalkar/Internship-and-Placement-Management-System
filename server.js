let express = require('express');
let app = express(); // Setup Express App
require('dotenv').config(); // Environment Variables
let morgan = require('morgan'); // middleware to log http requests
let port = 8080; // localhost : PORT=8080 nodemon server.js 
let bodyParser = require('body-parser');
const mongodbService = require('./app/services/mongodb.service'); // MongoDB Service
const User = require("./app/models/user.model");

app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// routes
app.use('/api/auth/', require('./app/routes/auth.router'));
app.use('/api/user', require('./app/routes/user.router'));
app.use('/api/announcement', require('./app/routes/announcement.router'));
app.use('/api/apply', require('./app/routes/apply.router'));
app.use('/api/attendance', require('./app/routes/attendance.router'));
app.use('/api/company', require('./app/routes/company.router'));
app.use('/api/coordinator', require('./app/routes/coordinator.router'));
app.use('/api/export', require('./app/routes/export.router'));
app.use('/api/feedback', require('./app/routes/feedback.router'));
app.use('/api/interview', require('./app/routes/interview.router'));
app.use('/api/notification', require('./app/routes/notification.router'));
app.use('/api/placements', require('./app/routes/placements.router'));
app.use('/api/upload', require('./app/routes/upload.router'));
app.use('/api/redFlag', require('./app/routes/redFlag.router'));
app.use('/api/group', require('./app/routes/group.router'));

app.use(express.static(__dirname + '/public'));
global.__basedir = __dirname; // Globally Declaring basedir to use in API files

mongodbService.connect(); // Connect to MongoDB
app.get('/save', async(req, res) => {
        try {
            const newUser = await User.create({ "student_name": "Viraj", "college_id": "22210044", "passout_batch": "2026", "program": "B.Tech", "gender": "M", "status": "active", "contact_no": "7499948150", "college_email": "viraj.22210044@viit.ac.in", "alternate_email": "virajwalavalkar525@gmail.com", "degree": "AI/ML", "department": "AI/ML", "cgpa": "9.5", "matric_marks": "85", "matric_board": "50", "senior_marks": "80", "senior_board": "50", "alternate_contact_no": "7647873125", "address": "GOA", "city": "GOA", "post_code": "123456", "state": "MH", "country": "IN", "linkedln_link": "https://viraj.millan", "login_otp": "dkj", "resume_url": "dkjh", "password": "Viraj@123", "active": true, "temporarytoken": "dfds", "permission": "student" });

            console.log(newUser);
            res.send(newUser);
        } catch (error) {
            console.log(error);
            res.send(error);
        }


    })
    // index page
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});

// server listening on port
app.listen(port, function() {
    console.log('Server running on port ' + port);
});