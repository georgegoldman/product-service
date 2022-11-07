module.exports = (err, req, res, next) => {
        
        if (err.status >= 400 && err.status < 500) {
                const err = new Error('Client error')
        } else {
                res.render('internal server error')
        }
}