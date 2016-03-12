import json

example = {
	"type" : "list",
	"schema" : ["string" , "string" , "date"],
	"labels" : ["Name","Place of birth" , "Birthday"],
	"data" : [
		["Leonardo" , "Italy" , "18/06/1995"],
		["Bill" , "Russia" , "19/10/1901"],
		["John" , "Spain" , "1/02/1993"]
	]
}

print(json.dumps(example))