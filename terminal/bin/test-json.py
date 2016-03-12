import json

example = {
	"type" : "list",
	"schema" : [
		{"type":"string" , "label":"Name"},
		{"type":"string" , "label":"Place of birth"},
		{"type":"date" , "label":"Birthday"},
	],
	"data" : [
		["Leonardo" , "Italy" , "18/06/1995"],
		["Bill" , "Russia" , "19/10/1901"],
		["John" , "Spain" , "1/02/1993"]
	]
}

print(json.dumps(example))