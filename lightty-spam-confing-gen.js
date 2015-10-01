//Lighttpd config generator to block suspicious referers

fs = require('fs');

fs.readFile('./spammers.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	var lighttyConfig = '#Lighttpd configuration file - Spam referer blacklist\n\n';

	data = data.trim().split('\n');

	for (var i = 0; i < data.length; ++i) {
		var domainRegExp = String(data[i]).replace('\.','\\.');

		if (i > 0) {
			lighttyConfig += ' else ';
		}
		//^($|.*(domainname\.com))
		lighttyConfig += '$HTTP["referer"] =~ "^($|.*('
		   + domainRegExp + '))" {\n    access.deny-all = "enable"\n    url.access-deny = ( "" )\n}';
	}

	fs.writeFile(
		"./lighttpd-spam-referer-blacklist.conf",
		lighttyConfig,
		function (err) {
			if (err) {
				return console.log(err);
			}
			console.log('Success writing lightty config!');
	});
});
