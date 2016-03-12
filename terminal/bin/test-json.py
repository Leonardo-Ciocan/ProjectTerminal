import json

example = {
	"type" : "list",
	"schema" : [
		{"type":"image" , "label":""},
		{"type":"string" , "label":"Name"},
		{"type":"string" , "label":"Place of birth"},
		{"type":"date" , "label":"Birthday"},
	],
	"data" : [
		["http://interesting-facts.com/wp-content/uploads/2014/10/Cat-Facts.jpg" , "Leonardo" , "Italy" , "18/06/1995"],
		["http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg", "Bill" , "Russia" , "19/10/1901"],
		["http://purrfectcatbreeds.com/wp-content/uploads/2014/06/siberian-cat1.jpg", "John" , "Spain" , "1/02/1993"]
	]
}

print(json.dumps(example))