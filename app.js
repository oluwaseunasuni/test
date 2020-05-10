const express = require('express');
const path = require('path');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');



const app = express();

var port = process.env.PORT || 3000;
// View Engine
app.set('view engine', 'ejs');

// Static folder
// app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.render('index');
});

app.post('/send-email', function (req, res) {

  const output = `
    <h3>Registration Details:</h3>
    <p>
    Hello, ${req.body.name} <br>
    We are pleased to announce to you that your registration has been recieved. <br>
    Please go through the details below and contact <a href = "mailto:oluwaseun.asuni@covenantuniversity.edu.ng">Support</a> <br>
    for any errors, thank you.
    </p>

    Name: ${req.body.name}
      <br>
      
    email: ${req.body.email}
      <br>
      
    D.O.B: ${req.body.age}
    <br>
      
      
    Gender: ${req.body.gender}
    <br>
      
      
    Bio: ${req.body.bio}
    <br>
      
      
    First Choice: ${req.body.user_interest}
    <br>
     
    Second Choice: ${req.body.user_interest}
    <br>
      
    Third choice: ${req.body.user_interest}
    <br>
    
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'asuni.test@gmail.com',
      pass: 'seun1234'
    }
  });

  let mailOptions = {
    from: '"Admin" <asuni.test@gmail.com>', // sender address
    to: `<${req.body.email}>`,
    bcc:'asuni.donbabas@gmail.com',    
    subject: 'Registration',
    // text: '',
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
});

app.listen(port, function () {
  console.log('Server is running');
});
