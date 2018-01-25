// navbar.style.position = "fixed";
// navbar.style.bottom = '0';

var xhr = new XMLHttpRequest();

var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=a4747a4cffac44e9a8ffd0e16c69db7b';

if (document.getElementById('news_reader')) {
	if (document.getElementById('news_reader').style.visibility == 'visible')
	{
		console.log('here1')
		document.getElementById('news_reader').style.visibility = 'hidden';
		document.getElementById('scroll').style.visiblity = 'hidden';
	}
	else {
		console.log('here2')
		document.getElementById('news_reader').style.visibility = 'visible';
		document.getElementById('scroll').style.visiblity = 'visible';		
	}
}

else {
	console.log('here3')

	var div = document.createElement('div');
	div.style.height = "50px";
	div.style.width = "100%"
	div.style.background = "grey";
	div.style.position = 'fixed';
	div.style.bottom = '0px';
	div.style.zIndex = '100';
	div.id = 'news_reader';
	div.className = "news_reader";
	div.style.visibility = "visible"
	document.body.appendChild(div);

	var scroll = document.createElement('p');
	scroll.innerHTML = "News is coming...";
	scroll.id = "scroll";
	scroll.className = "scroll";

	document.getElementById('news_reader').appendChild(scroll);
}


xhr.open("GET", url, true);
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		var resp = JSON.parse(xhr.responseText);
		var articles = resp.articles;
		var output = "";
		for (a=0; a<articles.length-1; a++)
		{
			output += "<a href="+articles[a].url+'style="color: rgb(255,255,255)" target="_blank">'+articles[a].title+"</a>"
			output += '&nbsp &nbsp &nbsp &nbsp &#8226 &nbsp &nbsp &nbsp &nbsp';
		}
		output += "<a href="+articles[a].url+'style="color: rgb(255,255,255)" target="_blank">'+articles[a].title+"</a>"
		document.getElementById('scroll').innerHTML = output
	}
}
xhr.send();


document.getElementById('scroll').addEventListener("animationend", listener, false)
function listener(e) {
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var resp = JSON.parse(xhr.responseText);
			var articles = resp.articles;
			var output = "";
			for (a=0; a<articles.length-1; a++)
			{
				output += "<a href="+articles[a].url+'style="color: rgb(255,255,255)" target="_blank">'+articles[a].title+"</a>"
				output += '&nbsp &nbsp &nbsp &nbsp &#8226 &nbsp &nbsp &nbsp &nbsp';
			}
			output += "<a href="+articles[a].url+'style="color: rgb(255,255,255)" target="_blank">'+articles[a].title+"</a>"
			var newElem = document.getElementById('scroll');
			var replaced = newElem.cloneNode(true);
			newElem.parentNode.replaceChild(replaced, newElem);

			document.getElementById('scroll').innerHTML = output
			document.getElementById('scroll').addEventListener("animationend", listener, false)
		}
	}
	xhr.send();
	
}



