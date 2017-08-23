var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config=
    {
    user: 'pindikuruarun',
    database:'pindikuruarun',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    };
    
var app = express();
app.use(morgan('combined'));

var menu = `<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/projects/project-one">Project 1</a></li>
				<li><a href="/projects/project-two">Project 2</a></li>
				<li><a href="/projects/project-three">Project 3</a></li>
			</ul>`;

var footer = 'You are what you think! | You are what you eat!';

function createTemplate (data){
	var title = data.title;
	var header = data.heading;
	var content = data.content;
	var dt = data.date;
	
	var htmlTemplate = `
	<html lang="en">
	<head>
		<title>${title}</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link type="text/css" rel="stylesheet" href="/ui/style.css">
		<link rel="shortcut icon" href="/ui/favicon.ico" type="image/x-icon"> 
	</head>

	<body>
		<div id="header">
			<center><h1>${header}</h1></center>
		</div>
		<div id="navbar">
			${menu}
		</div>
		
		<div class="main2">
		    Updated On: ${dt.toDateString()}<br>
			${content}
		</div>
		<div id="footer">
			<p align="center">${footer}</p>
		</div>	
		<div id="comments">
			Comments<br>
			<textarea id="new_comment"></textarea><br><br>
			<input type="submit" value="Submit" id="submit_btn"></input>
			<hr></hr>
			<p id="commentslist">
			</p>
			<hr></hr>
		</div>
		<script type="text/javascript" src="/ui/projects.js"></script>
	</body>
	</html>
	`;

	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var comments = [];
app.get('/submit-comment', function (req, res) {
	//Get the name from the request
	var comment = req.query.NewComment;
	
	comments.push(comment);
	res.send(JSON.stringify(comments));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    //make a select request
    //return a response with a result
    pool.query('SELECT * from test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }  else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.get('/projects/:ProjectName', function (req, res) {
	pool.query("SELECT * from article where title= $1", [req.params.ProjectName], function(err, result) {
	    if (err){
	        result.status(500).send(err.toString());
	    } else {
	        if (result.rows.length === 0){
	            res.status(404).send('Article not found');
	        } else {
	            var ProjectData = result.rows[0];
	            res.send(createTemplate(ProjectData));
	        }
	    }
	})
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

//Added in Module P4
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

//Added in Module P4
app.get('/ui/projects.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'projects.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});