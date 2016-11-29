a = json.beers @beers do |beer|
  json.id beer.id
  json.name beer.name
  json.created_at beer.created_at
  json.updated_at beer.updated_at
end
return a.to_json
