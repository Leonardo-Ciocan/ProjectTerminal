require 'instagram'
require 'geocoder'

Instagram.configure do |config|
  config.client_id = "d1a2df2db2364e2bb3ad1bdc8a6c297f"
  config.client_secret = "b2f2c21a4e0d46108e7ed59f5bcb939f"
end

locations = [];

insta = Instagram.client(:access_token => "1455523771.d1a2df2.1fc5f49ad9ca44d18ceb5b6a8b08f3f2")

for item in insta.tag_recent_media(ARGV[0])
	if item[:location] != nil then
		a = Geocoder.search("#{item[:location][:latitude]},#{item[:location][:longitude]}").first
		#item[:location].merge!("country" => a.country, "image" => item[:images][:standard_resolution][:url])
		arr = [
			item[:images][:standard_resolution][:url],
			item.caption.text,
			a.country
		]
		locations.push(arr)
	end
end

result = { "type" => "list", "schema" => [ 
	{ "label" => "", "type" => "image"},
	{ "label" => "Caption", "type" => "string"},
	{ "label" => "Country", "type" => "string"}
], "data" => locations }

puts result.to_json