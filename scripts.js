var cats = [
	"<img src='images/cats/1.png'>", 
	"<img src='images/cats/2.png'>",
	"<img src='images/cats/3.png'>", 
	"<img src='images/cats/4.png'>",
	"<img src='images/cats/5.png'>",
	"<img src='images/cats/6.png'>",
	"<img src='images/cats/7.png'>",
	"<img src='images/cats/8.png'>",
	"<img src='images/cats/9.png'>",
	"<img src='images/cats/10.png'>",
	"<img src='images/cats/11.png'>",
	"<img src='images/cats/12.png'>",
];

var dogs = [
	"<img src='images/dogs/1.png'>", 
	"<img src='images/dogs/2.png'>",
	"<img src='images/dogs/3.png'>", 
	"<img src='images/dogs/4.png'>",
	"<img src='images/dogs/5.png'>",
	"<img src='images/dogs/6.png'>",
	"<img src='images/dogs/7.png'>",
	"<img src='images/dogs/8.png'>",
	"<img src='images/dogs/9.png'>",
	"<img src='images/dogs/10.png'>",
	"<img src='images/dogs/11.png'>",
	"<img src='images/dogs/12.png'>",
];

var spiders = [
	"<img src='images/spiders/1.png'>", 
	"<img src='images/spiders/2.png'>",
	"<img src='images/spiders/3.png'>", 
	"<img src='images/spiders/4.png'>",
	"<img src='images/spiders/5.png'>",
	"<img src='images/spiders/6.png'>",
	"<img src='images/spiders/7.png'>",
	"<img src='images/spiders/8.png'>",
	"<img src='images/spiders/9.png'>",
	"<img src='images/spiders/10.png'>",
	"<img src='images/spiders/11.png'>",
	"<img src='images/spiders/12.png'>",
];

var shuffledCards = [];
var gridSize = 4;
var mgHtml = '';
var cardsUp = '';
var deck = cats;

$(document).ready(function() {

	$('.easy').prop('disabled', true);
	$('.cats').prop('disabled', true)
	
	$('.easy').click(function(){
		gridSize = 4;
		reset();
		$(this).prop('disabled', true);
		$('.med, .hard').prop('disabled', false)
	});

	$('.med').click(function(){
		gridSize = 8;
		reset();
		$(this).prop('disabled', true);
		$('.easy, .hard').prop('disabled', false)
	});

	$('.hard').click(function(){
		gridSize = 14;
		reset();
		$(this).prop('disabled', true);
		$('.easy, .med').prop('disabled', false)
	});

	$('.cats').click(function(){
		deck = cats;
		reset();
		$(this).prop('disabled', true);
		$('.dogs, .spiders').prop('disabled', false)
	});

	$('.dogs').click(function(){
		deck = dogs;
		reset();
		$(this).prop('disabled', true);
		$('.cats, .spiders').prop('disabled', false)
	});

	$('.spiders').click(function(){
		deck = spiders;
		reset();
		$(this).prop('disabled', true);
		$('.dogs, .cats').prop('disabled', false)
	});

	shuffleCards(deck);
	placeCards();
	addListener();

});

function shuffleCards(array) {
	for (var i = 0; i < gridSize; i++) {
		shuffledCards.push(array[i]);
		shuffledCards.push(array[i])
	}

	for (var i = 1; i < 100; i++) {
		card1 = Math.floor(Math.random() * (gridSize - 1));
		card2 = Math.floor(Math.random() * (gridSize - 1));
		var temp = shuffledCards[card1];
		shuffledCards[card1] = shuffledCards[card2];
		shuffledCards[card2] = temp;
	}
	console.log(gridSize)
}

function placeCards(){
	for (var i = 0; i < gridSize; i++) {
			
		mgHtml += "<div class='mg-tile col-sm-3'>";
			mgHtml += "<div class='mg-tile-inner'>";
					mgHtml += "<div class='mg-back'>" + shuffledCards[i] + "</div>";

				mgHtml += "<div class='mg-front'><img src='images/logo.png'></div>";
			mgHtml += "</div>"
		mgHtml += "</div>"
		
	}
	$('.mg-contents').html(mgHtml);
	// $('.mg-tile-inner').removeClass('mg-tile-inner-init');
}

function addListener() {
	$('.mg-tile-inner').click(function() {
		$(this).toggleClass('flip');
		cardsUp = $('.flip');
		if (cardsUp.length == 2) {
			// check to see if same
			if (cardsUp.find('.mg-back img')[0].src == cardsUp.find('.mg-back img')[1].src) {
				cardsUp.addClass('matched');
				cardsUp.removeClass('flip');
			}
			else {
				setTimeout(function(){
					cardsUp.removeClass('flip');
				}, 1000)		
			}
		}
		if ($('.matched').length == gridSize) {
			
			setTimeout(function(){
				$('.matched').addClass('flip-back');
			}, 1000);

			setTimeout(function(){
				$('.mg-tile-inner').addClass('slip-out');
			}, 2000)

			setTimeout(function(){
				$('.matched').removeClass('matched');
				shuffledCards = [];
				mgHtml = '';
				$('.mg-contents').html('');
				shuffleCards(deck);
				placeCards();
				addListener();

			}, 3000);
		}
	});
}


	

function reset() {
	// setTimeout(function(){
	$('.mg-tile').addClass('slip-out');
	shuffledCards = [];
	// }, 1000);

	setTimeout(function(){
		// $('.matched').removeClass('matched');
		
		shuffleCards(deck);
		mgHtml = '';
		$('.mg-contents').html('');
		
		placeCards();
		addListener();


	}, 1000);
}