const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'db.sqlite3',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

// add your API routes below

app.post('/userdata', async (req, res) => {
	let result = await db.all('select * from profile where id = ?', req.body.id);
	let quote = await db.all('select * from quote where profile_id = ?', req.body.id);
	res.json({result, quote});
})

app.post('/likes', async (req, res) => {
	let update = await db.all('update profile set likes = likes + 1 where id = ?', req.body.id);
	let result = await db.all('select * from profile where id = ?', req.body.id);
	res.json(result);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
