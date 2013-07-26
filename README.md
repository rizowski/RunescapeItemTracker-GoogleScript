RunescapeItemTracker-GoogleScript
=================================
This is the code backup for the Google Script that I have been devloping for the past few months as a side project.

What it does
------------
This goes out to the Runescape Api at the specified URL for items. It takes the poorly formatted JSON and parses out all the junk left in prices and such. For example the price change in 90 days would return +3. This could also have various other symbols such as k,m,b,%,-,+. I parse all these symbols out the api and return the pure number. After that I have other methods that cache the results and display them in a Google Spreadsheet. It isn't currently set up to set up the project right from the get go. In future versions I would like to implement that.
