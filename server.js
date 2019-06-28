const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let nextId = 2;

function getNewId() {
  return nextId++;
}

let friends = [
  {
    id: 1,
    firstName: 'Isaias',
    lastName: 'Garcia-Ariza',
    phone: '818-577-0723',
    email: 'i.garcia-ariza@lambdaschool.com',
    photoUrl: 'https://ca.slack-edge.com/T4JUEB3ME-UFW164WKC-7742898f4bad-512'
  }  
];

app.use(cors());
app.use(bodyParser.json());

app.get('/school', (req, res) => {
  res.status(200).json(friends);
});

app.post('/school', (req, res) => {
  const friend = { id: getNewId(), ...req.body };
  friends = [...friends, friend];
  res.status(201).json(friends);
});

app.put('/school/:id', (req, res) => {
  const { id } = req.params;
  let friendIndex = friends.findIndex(friend => friend.id == id);

  if (friendIndex >= 0) {
    friends[friendIndex] = { ...friends[friendIndex], ...req.body };
    res.status(200).json(friends);
  } else {
    res
      .status(404)
      .json({ message: `The friend with id ${id} does not exist.` });
  }
});

app.delete('/school/:id', (req, res) => {
	friends = friends.filter(friend => friend.id != req.params.id);
	res.status(200).json(friends);
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});