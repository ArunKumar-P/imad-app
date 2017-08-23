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

var Projects = {
	'project-one': {
		title1: 'Project 1',
		header: 'Cloud Migration & Platform Migration: Cloud-Based EHR',
		menu: `<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/project-one">Project 1</a></li>
				<li><a href="/project-two">Project 2</a></li>
				<li><a href="/project-three">Project 3</a></li>
			</ul>`,
		content: `
		<h3>The Challenge</h3>
		<p>The client's legacy EHR application, which was initially developed to enable physician productivity and provide superior clinical experiences, 
		   needed to be migrated to a cloud-based environment that would support the client's key business objectives, 
		   including: scale for growth, ease of access and integrations aligned with the growing business needs of the end-consumer. 
		   Unfortunately, bandwidth constraints hindered the client's initial migration initiative, 
		   leading to missed go-to-market commitments and non-compliance with Meaningfule Use mandates.</p>
		
		<h3>Our Approach</h3>
		<p>We developed an extremely aggressive migration schedule for the EHR application, with a staggered go-to-market strategy and multiple releases in
			one year. The emids Healthcare Practice team achieved this goal by acting as the interim product owner, defining modules and sequencing throughout
			the project. The team updated the legacy EHR and practice management system to the latest .NET stack, with a configurable message exchange
			platform, allowing for more flexibility in integrations.
			In 18 months, the team delivered a fully cloud-based EHR and a new interface engine that connected the client's EHR with external systems. The
			resulting project management plan was also fully aligned with the client's businesses priorities, especially regarding faster go-to-market.</p>

		<h3>Value Addition for the Customer</h3>
		<ul>
			<li>Developed QA automation framework</li>
			<li>Created EHR modules that included: clinical documentation, messaging, document management, a patient portal, interface engine, dashboards, practice management, immunization, orders, rules engine, scheduling, tracking board and reports
			<li>Involved the HC Centre of Excellence in product management and in reviewing high-level requirements</li>
			<li>Provided the client with reusable artifacts (canned requirements use cases for EMR & PMS)</li>
		</ul>
		`,
		footer: 'You are what you think! | You are what you eat!'
	},
	
	'project-two': {
		title1: 'Project 2',
		header: 'Need for Activity Based Costing in Healthcare Setting',
		menu: `<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/project-one">Project 1</a></li>
				<li><a href="/project-two">Project 2</a></li>
				<li><a href="/project-three">Project 3</a></li>
			</ul>`,
		content: `
		<h3>Introduction</h3>
		<p>In the last decade, many non-profit and hospital organizations started to face difficulties and challenges in balancing limited resources 
		   and costs to provide their demand for services. Due to the introduction of modern medical techniques and medicines and consequent increase of 
		   consumed costs, many hospitals are under pressure to adopt more advanced cost management techniques usually utilized only in profit organization sector. 
		   Hospital managers frequently seek the advanced techniques, for better understanding of relations between the cost and provided services. 
		   One of the key factors of effective company management is ability of accurate estimation of the cost of products. Product costing is an essential 
		   economic tool used to quantify the cost of individual interventions carried out. The need for an accurate method of costing in hospital organizations 
		   is frequently emphasized by many authors. Gujral et al. comment, that healthcare organizations use cost accounting to estimate the unit cost of services 
		   they provide. Koyama states, that the importance of obtaining accurate estimates of costs for medical services is increasingly recognized by hospital 
		   managers. Last but not least Ridderstolpe et al. state, that a valid basis for calculation is increasingly important in the cost control of 
		   health care against a background of increasing demands and resource constraints. </p>
		
		<h3>Discussion and Conclusion.</h3>
		<p>Together with the emergence of ABC methodology in 1980's, issues relating to the practical application in different types of organizations 
		   have been presented by both academics and practitioners. Drury  defined the necessary steps to set up an ABC system as follows:
		   <ol>
				<li>Identifying the major activities</li>
				<li>Assigning costs to cost pools/cost centers for each activity</li>
				<li>Determining the cost driver for every activity</li>
				<li>Assigning the costs of activities to products </li>
			</ol>
		</p>
		`,
		footer: 'You are what you think! | You are what you eat!'
	},
	
	'project-three': {
		title1: 'Project 3',
		header: 'Inventory Management System',
		menu: `<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/project-one">Project 1</a></li>
				<li><a href="/project-two">Project 2</a></li>
				<li><a href="/project-three">Project 3</a></li>
			</ul>`,
		content: `
		<h3>Introduction</h3>
		<p>The objective of inventory management system is to provide uninterrupted production, sales, and/or customer-service levels at the minimum cost. 
		   The inventory management system strategy that companies use when they store a large amount of inventory because they are likely to run out of 
		   stock. Companies that use this strategy have higher costs initially, but it cuts down the number of lost sales that happen when there is not 
		   enough inventory. The inventory management system includes the following modules:</p>
		   
			<ul>
				<li>The <b>Inventory module</b> menu gives you quick links to various aspects of Inventory Manager related to your product list, prices, current inventory levels.
				<li>The <b>Purchasing homepage</b> gives you quick links to various aspects of this system manager related to placing purchase orders to your vendors, receiving.
				<li>The <b>Sales module</b> gives you quick links to various aspects of this system manager related to taking and processing customer orders or customer information.
				<li><b>Reports Manager</b> has a variety of reports that you can use to gather, print out and share information about sales trends, payment other aspects of your business.
			</ul>
		<h3>Feature List</h3>
		<table>
			<tr>
				<th>A. Inventory</th>
				<th></th>
				<th>B. Purchasing</th>
				<th></th>
				<th>C. Sales</th>
				<th></th>
				<th>D. Reports</th>
			</tr>
			<tr>
				<td>Reorder Stock.</td>
				<td></td>
				<td>Latest Order</td>
				<td></td>
				<td>Latest Quote</td>
				<td></td>
				<td>Inventory Reports</td>
			</tr>
			<tr>
				<td>Count Stock.</td>
				<td></td>
				<td>Receive Stock.</td>
				<td></td>
				<td>New Order.</td>
				<td></td>
				<td>Purchase Reports</td>
			</tr>
			<tr>
				<td>Transfer stock.</td>
				<td></td>
				<td>Pay order.</td>
				<td></td>
				<td>Process Orders.</td>
				<td></td>
				<td>Sales Reports.</td>
			</tr>
			<tr>
				<td>Adjust stock.</td>
				<td></td>
				<td>Add New Vendor.</td>
				<td></td>
				<td>Invoice Orders.</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>Add New Product.</td>
				<td></td>
				<td></td>
				<td></td>
				<td>New Customer.</td>
				<td></td>
				<td></td>
			</tr>
		</table>
	</div>
		`,
		footer: 'You are what you think! | You are what you eat!'
	}		
};

function createTemplate (data){
	var title1 = data.title1;
	var header = data.header;
	var content = data.content;
	
	var htmlTemplate = `
	<html lang="en">
	<head>
		<title>${title1}</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link type="text/css" rel="stylesheet" href="ui/style.css">
		<link rel="shortcut icon" href="ui/favicon.ico" type="image/x-icon"> 
	</head>

	<body>
		<div id="header">
			<center><h1>${header}</h1></center>
		</div>
		<div id="navbar">
			${menu}
		</div>
		
		<div class="main2">
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
		<script type="text/javascript" src="ui/projects.js"></script>
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
	pool.query("SELECT * from article where title='"+req.params.ProjectName+"'", function(err, result) {
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