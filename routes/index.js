var express = require('express')

var app = express()

var router = express.Router(); 

var games = require('./games');

const uuid = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1.
router.get('/games', function (req, res, next) {
  res.json(games);
});
router.get('/', function(req, res, next) {
  res.render('index', { title: newGame.name });
});

// 2.
router.get('/games/:id', function(req, res, next) {
  const found = games.some(game => game.id === parseInt(req.params.id));
   if (found) {
      res.json(games.filter(game => game.id === parseInt(req.params.id)));
    }
    else {
     res.status(400).json({
       msg: 'Game not found'
      });
      }
  });
 
  // 3.create  game and post

router.post('/games', (req, res) => {
  global.newGame = {
    id: uuid.v4(),
    name: req.body.name
  };

  if (!newGame.name || !newGame.id) {
    return res.status(400).json({ msg: 'Required id and name' });
  }
  games.push(newGame);
  res.json(games)
});

// 4.update game
router.put('/games/:id', function(req, res) {
  const found = games.some(game => game.id === parseInt(req.params.id));
   if (found) {
     const updateGame = res.body;
     games.forEach(game => {
       if (game.id === parseInt(req.params.id)) {
         game.name = updateGame.name ? updateGame.name : game.name;
         res.json({ msg: 'Game updated', game });
       }
     });
    } else {
     res.status(400).json({
       msg: 'Game not found'
      });
      }
});
  // 5.delete game
  router.delete('/games/:id', function(req, res, next) {
    const found = games.some(game => game.id === parseInt(req.params.id));
     if (found) {
       res.json({ msg: 'Game deleted', games:games.filter(game => game.id !== parseInt(req.params.id)) });
      }
      else {
       res.status(400).json({
         msg: 'Game not found'
        });
        }
    });
  



module.exports = router;
