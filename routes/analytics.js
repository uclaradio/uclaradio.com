var express = require('express');
var router = express.Router();
var currentListeners = 0;

router.get('/', function(req, res) {
	res.render('analytics', {currentListeners: currentListeners});
});

router.get('/getCount',function(req, res){
	res.json(currentListeners);
})

router.get('/increment', function(req, res){
	currentListeners = currentListeners + 1;
	console.log('increment: ' + currentListeners)
	res.json(currentListeners)
});

router.get('/decrement', function(req, res){
	currentListeners = currentListeners - 1;
	console.log('decrement: ' + currentListeners)
	if(currentListeners < 0) {
		currentListeners = 0;
	}
	res.json(currentListeners)

});

module.exports = router;
