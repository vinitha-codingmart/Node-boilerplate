const router = require('express').Router()
var nodemailer = require('nodemailer');
var encryptor = require('file-encryptor');
var key = 'My Super Secret Key';
var options = { algorithm: 'aes256' };
var transporter;

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage });

class sampleRoute {
  constructor(sampleContoller) {
    this.controller = sampleContoller
    this.init()
  }

  init() {
    router.use('/', async (req, res, next) => {
      console.log("user")
      next()
    })

    router.post('/login', async (req, res) => {
      try {
        const response = await this.controller.login(req.body)
        res.json(response)
      } catch (err) {
        console.log(err)
        res.json({ code: 500, msg: 'getting Accesses Failed' })
      }
    })

    router.post('/signup', async (req, res) => {
      try {
        const response = await this.controller.signup(req.body)
        res.json(response)
      } catch (err) {
        res.json({ code: 500, msg: 'getting Accesses Failed' })
      }
    })

    router.post('/sendmail', upload.single('to_file'), (req, res, next) => {
      var file = req.file;

      var to_user = req.body.to_user;
      console.log(req.body)
      // let senderData = JSON.parse(req.body.userData)
      var mailer = {
        user: req.body.email,
        pass: req.body.password
      }
      var to_subject = req.body.to_subject;
      if (!file) {
        res.status(200).send({
          message: 'Please Select a File'
        });
      }
      else {
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: mailer.user,
            pass: mailer.pass
          }
        });
        console.log("This is " + to_user);
        console.log("this is " + to_subject);
        var to_path = 'uploads/' + file.filename;
        var mailOptions = {
          from: transporter.options.auth.user,
          to: to_user,
          subject: 'The Prescription',
          text: to_subject,
          attachments: [{
            path: to_path
          }]
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.status(200).send({
              message: 'Email and Password Not Accepted'
            });
          } else {
            console.log('Email sent: ' + info.response);
            encryptor.encryptFile(to_path, 'encrypted.dat', key, function (err) {
              // Encryption complete.
              console.log(err, "encrytion")
              res.status(200).send({
                message: 'Success'
              });
            });
            
          }
        });
      }
    })
  }

  // Get Router
  getRouter() {
    return router
  }
}
module.exports = controller => {
  return new sampleRoute(controller)
}
