
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
	var newCommentInput = document.getElementById('new_comment');
	var newComment = newCommentInput.value;
	//Create a request object
	var request = new XMLHttpRequest();
	
	//Capture the response and store it in a variable
	request.onreadystatechange = function() {
		if(request.readyState === XMLHttpRequest.DONE){
			//Take some action
			if(request.status === 200) {
				//Capture a list of names and render it in a paragraph
				var prevComments = request.responseText;
				prevComments = JSON.parse(prevComments);
				
				var list = '';
				for(var i=0; i<prevComments.length; i++){
					list += prevComments[i] +'<br><br>';
				}
				var p = document.getElementById('commentslist');
				p.innerHTML = list;
			}
		}
	};
	
	request.open('GET', 'http://http://pindikuruarun.imad.hasura-app.io/submit-comment?NewComment=' + newComment, true);
	request.send(null);
}



