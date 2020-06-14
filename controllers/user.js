var sequelize = require("sequelize")
const db = require('./../config/database')

class SampleController {

    login(data) {
        return new Promise((resolve, reject) => {
            try {
                var email = data.email;
                var password = data.password;
                if (email && password) {
                    db.sequelize.query(`SELECT * FROM doctors WHERE email = '${email}' AND password = '${password}'`)
                        .then((results) => {
                            console.log(results[0]);
                            if (results[0].length > 0) {
                                resolve({
                                    message: 'Success'
                                });
                            } else {
                                resolve({
                                    message: "Invalid Email and/or Password"
                                });
                            }
                        });
                }
                else
                    resolve({
                        message: "Enter Email and Passoword"
                    });
            } catch (err) {
                reject(err)
            }
        })
    }

    signup(data) {
        return new Promise((resolve, reject) => {
            try {
                console.log(data)
                var email = data.email
                var username = data.name;
                var password = data.password;
                if (email && password) {
                    db.sequelize.query(`SELECT * FROM doctors WHERE email = '${email}' AND password = '${password}'`)
                        .then((results) => {
                            console.log(results[0]);
                            if (results[0].length > 0) {
                                resolve({
                                    message: "Email Already Used"
                                });
                            } else {
                                db.sequelize.query(`INSERT INTO doctors(name,email,password,"createdAt","updatedAt") values('${username}','${email}','${password}','2020-06-13 23:24:55.040203+05:30','2020-06-13 23:24:55.040203+05:30')`);
                                resolve({
                                    message: "Success"
                                });
                            }
                        });
                }
                else
                    resolve({
                        message: "Please Enter Email And Password"
                    });
            } catch (err) {
                reject(err)
            }
        })
    }

    sendmail(data) {
        return new Promise((resolve, reject) => {
            try {
                resolve("Sample response")
            } catch (err) {
                reject(err)
            }
        })
    }
}


module.exports = () => {
    return new SampleController()
}