//Lighttpd config generator to block suspicious referers

fs = require('fs');

fs.readFile('./spammers.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	var lighttyConfig = '#Lighttpd configuration file - Spam referer blacklist\n\n';

	data = data.trim().split('\n');
	//console.log(data);
	//console.log(data.length + " number of spam host !");

	for (var i = 0; i < data.length; ++i) {
		//console.log("Spam domain number " + i);
		//console.log(data[i]);
		var domainRegExp = String(data[i]).replace('\.','\\.');
		console.log("DomainRegExp : " + domainRegExp);

		if (i > 0) {
			lighttyConfig += ' else ';
		}

		lighttyConfig += '$HTTP["referer"] =~ ".*'
		   + domainRegExp + '.*" {\n    access.deny-all = "enable"\n    url.access-deny = ( "" )\n}';
		//console.log(lighttyConfig);
	}
//	console.log("Generated lightty config :\n")
//	console.log(lighttyConfig);
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
