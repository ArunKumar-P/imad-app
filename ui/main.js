console.log('Loaded!');

var quotes = [
	"Travel is fatal to prejudice, bigotry, and narrow-mindedness.",
	"The secret of getting ahead is getting started.",
	"You are what you think! | You are what you eat!",
	"Kindness is the language which the deaf can hear and the blind can see.",
	"Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
	"Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth is not.",
	"It is not the size of the dog in the fight, it is the size of the fight in the dog.",
	"If you tell the truth, you do not have to remember anything.",
	"I have never let my schooling interfere with my education.",
	"Golf is a good walk spoiled.",
];

var ctr=0;
var str1='<p align="center">';
var str2='</p>';

function changeFooterText() {
	if (ctr < 9) { ctr = ctr + 1;
	} 
	else {
		ctr = 0;
	}
	
	var strResult = str1.concat(quotes[ctr],str2);
	
	var element = document.getElementById('footer');
	element.innerHTML = strResult;	
}

var madi = document.getElementById('madi');
madi.onclick = function(){
	var interval = setInterval(changeFooterText, 1000);
}

