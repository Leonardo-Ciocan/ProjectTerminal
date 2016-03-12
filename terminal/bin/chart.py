import json

data = {
	"type" : "tabular/single",
	"data" : [
		{"label":"ls" , "value":10},
		{"label":"rm" , "value":5},
		{"label":"cd" , "value":28},
		{"label":"open" , "value":9},
		{"label":"mv" , "value":11},
	]
}

print(json.dumps(data))