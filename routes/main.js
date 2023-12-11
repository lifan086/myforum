module.exports = function(app) {
    // Handle our routes

    //Default route
    app.get('/',function(req,res){
        res.render('index.ejs')
        });

    app.get('/about',function(req,res){
        res.render('about.ejs');
        });
    
    app.get('/search',function(req,res){
        res.render("search.ejs");
        //searching in the database
        const searchTerm = req.query.keyword; // Assuming you're getting a query parameter named 'term'
        let query = "SELECT * FROM post";
        db.query(query, (error, results) => {
            if (error) throw error;
            res.render('search-result.ejs', { results }); // 'results' is the EJS file, and { results } is the data passed to it
            });
        });

    //List posts route
    app.get('/listposts',function(req,res){
        let sqlquery = `SELECT *
                        FROM post
                        JOIN topic
                        ON post.topic_id=topic.topic_id`;//query database to get all the posts
    // execute sql query
    db.query(sqlquery, (err, result) =>{
        if (err){
            res.redirect('./');
        }
        console.log(result)
        res.render('listposts.ejs',{posts:result})
        });
    });

    //List users route
    app.get('/listposts',function(req,res){
        let sqlquery = `SELECT *
                        FROM user
                        JOIN membership
                        ON user.topic_id=topic.topic_id`;//query database to get all the users
    // execute sql query
    db.query(sqlquery, (err, result) =>{
        if (err){
            res.redirect('./');
        }
        console.log(result)
        res.render('listusers.ejs',{posts:result})
        });
    });

    //List topics route
    app.get('/listtopics',function(req,res){
        let sqlquery = `SELECT *
                        FROM topic
                        JOIN post
                        ON topic.topic_id=post.topic_id`;//query database to get all the topics
    // execute sql query
    db.query(sqlquery, (err, result) =>{
        if (err){
            res.redirect('./');
        }
        console.log(result)
        res.render('listtopics.ejs',{posts:result})
        });
    });

    //add posts
    app.get('/addpost', function(req,res){
    res.render('addpost.ejs');                                                                     
}); 
    app.post('/postadded', function (req,res) {
    // saving data in database
    let sqlquery = "INSERT INTO post (topic, text) VALUES (?,?)";
    // execute sql query
    let newrecord = [req.body.topic, parseFloat (req.body.info)];
    db.query(sqlquery, newrecord, (err, result) => {
    if (err) {
    return console.error(err.message);
    }
    else {
      res.send(' This post is added to database, topic: '
                       + req.body.topic + ' text '+ req.body.info);
    }
    });
    });  


}