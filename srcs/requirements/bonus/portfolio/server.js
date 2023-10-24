const express = require('express');
const path = require('path');
const app = express();

const port = 1337;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
	console.log(`cub3d server is running on http://localhost:${port}`);
});