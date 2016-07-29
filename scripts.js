var cards = [
		"<img src='images/1.png'>", 
		"<img src='images/1.png'>", 
		"<img src='images/2.png'>",
		"<img src='images/2.png'>", 
		"<img src='images/3.png'>",
		"<img src='images/3.png'>",  
		"<img src='images/4.png'>",
		"<img src='images/4.png'>",
		"<img src='images/5.png'>",
		"<img src='images/5.png'>",
		"<img src='images/6.png'>",
		"<img src='images/6.png'>",
		"<img src='images/7.png'>",
		"<img src='images/7.png'>",
		"<img src='images/8.png'>",
		"<img src='images/8.png'>",
		"<img src='images/9.png'>",
		"<img src='images/9.png'>",
		"<img src='images/10.png'>",
		"<img src='images/10.png'>",
		"<img src='images/11.png'>",
		"<img src='images/11.png'>",
		"<img src='images/12.png'>",
		"<img src='images/12.png'>",
		"<img src='images/13.png'>",
		"<img src='images/13.png'>",

	];

	var gridSize = 4;

	var mgHtml = '';

	cardsUp = '';

console.log(cards)

$(document).ready(function() {
	
	$('.easy').click(function(){
		gridSize = 8;
		reset();
	});

	$('.med').click(function(){
		gridSize = 12;
		reset();
	});

	$('.hard').click(function(){
		gridSize = 14;
		reset();
	});

	shuffleCards(cards);
	placeCards();
	addListener();

	

});

function shuffleCards(array) {
	for (var i = 1; i < 100; i++) {
		card1 = Math.floor(Math.random() * (gridSize -1));
		card2 = Math.floor(Math.random() * (gridSize -1));
		var temp = array[card1];
		array[card1] = array[card2];
		array[card2] = temp;
	}
}

function placeCards(){
	for (var i = 0; i < gridSize; i++) {
			
		mgHtml += "<div class='mg-tile col-sm-3'>";
			mgHtml += "<div class='mg-tile-inner'>";
					mgHtml += "<div class='mg-back'>" + cards[i] + "</div>";

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
				$('.matched').removeClass('matched');
				$()
				mgHtml = '';
				$('.mg-contents').html('');
				shuffleCards(cards);
				placeCards();
				addListener();

			}, 2000);
		}
	});
}


	

function reset() {
	// setTimeout(function(){
		$('.mg-tile-inner').addClass('slip-out');
	// }, 1000);

	setTimeout(function(){
		$('.matched').removeClass('matched');
		mgHtml = '';
		$('.mg-contents').html('');
		shuffleCards(cards);
		placeCards();
		addListener();


	}, 1000);
}