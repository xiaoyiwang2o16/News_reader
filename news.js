// navbar.style.position = "fixed";
// navbar.style.bottom = '0';


var mykey = //YOUR_KEY_HERE
var xhr = new XMLHttpRequest();

var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey='+mykey;

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
	var div = document.createElement('div');
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

function get_news() {
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var resp = JSON.parse(xhr.responseText);
			var articles = resp.articles;
			var output = "";
			for (a=0; a<articles.length-1; a++)
			{
				output += "<a href="+articles[a].url+' style="color: rgb(255,255,255)" target="_blank">'+articles[a].title+"</a>"
				output += '&nbsp &nbsp &nbsp &nbsp &#8226 &nbsp &nbsp &nbsp &nbsp';
			}
			output += "<a href="+articles[articles.length-1].url+"style='color: rgb(255,255,255)' target='_blank'>"+articles[articles.length-1].title+"</a>"
			document.getElementById('scroll').innerHTML = output
			var newElem = document.getElementById('scroll');
			var replaced = newElem.cloneNode(true);
			newElem.parentNode.replaceChild(replaced, newElem);

			document.getElementById('scroll').innerHTML = output
			document.getElementById('scroll').addEventListener("animationend", listener, false)
		}
	}
	xhr.send();

}

get_news()

function listener(e) {
	get_news()
	
}



