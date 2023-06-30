let central = require('./central'),
    db1 = require('./db1'),
    db2 = require('./db2'),
    db3 = require('./db3'),
    vault = require('./vault'),
    mark = require('./mark');

module.exports = function (id) {
    return new Promise((resolve, reject) => {
        let obj = { id }
        let dbname;


        let x = central(id)
            .catch(_ => Promise.reject('Error central'))
            .then(name => {
                dbname = name
                return { db1, db2, db3 }[name]
            })
            .then(db => db(id).catch(_ => Promise.reject(`Error ${dbname}`)))//catch is inside because it Error centeral will be Error undefined


        let y = vault(id).catch(_ => Promise.reject('Error vault'))

        Promise.all([x, y]).then(data => {
            data.forEach(d => {
                obj = Object.assign(obj, d)
            });
            resolve(obj)
            mark(id).then(() => { }).cath(() => { })
        }).catch(
            err => { reject(err) }
        )

    })
};

