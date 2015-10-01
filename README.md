This script generates Lighttpd rules to prevent unwanted referers from polluting logs and stats

The script reads a blacklist file 'spammers.txt' containing the bad referers' hosts seperated with LFs

You may import a pre-made blacklist from https://github.com/piwik/referrer-spam-blacklist

Then include the generated file 'lighttpd-spam-referer-blacklist.conf' in you lightty config.
