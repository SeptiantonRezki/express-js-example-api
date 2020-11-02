module.exports = (app) => {
    app.get(('/'), (req, res, next) => {
        res.send('Welcome to the hompage');
    });
    
    
    app.get('/user/:id/:postId', (req, res, next) => {
        // localhost:5000/user/1/10?comment=first&like=first
        console.log(req.params); // {id : '1', postId:'10'}
        console.log(req.query);// {comment : 'first', like:'first'}
        const host  = req.get('host');
        console.log(host);
        res.send('Welcome to user page');
    });
};