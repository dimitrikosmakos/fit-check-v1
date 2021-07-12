import json

with open('./clothing_store/men.json') as f:
  data = json.loads(f.read())['men']

with open('./clothing_store/women.json') as f:
  data.extend(json.loads(f.read())['women'])

# structure: db[category] = attributes dictionary
# attributes dictionary[name] = array of probabilities collected
db = {}

for outfit in data:
  try:
    attributes = outfit['results'][0]['attributes']
    categories = outfit['results'][0]['categories']
    top_cat = categories[0]['name']
  except:
    continue
  entry = {}

  if top_cat in db:
    # entry is a dictionary of attributes
    entry = db[top_cat]

  
  for attribute in attributes:
    name = attribute['name']
    prob = attribute['probability']
    if name in entry:
      entry[name].append(prob)
    else:
      entry[name] = [prob]
  
  db[top_cat] = entry
  
for category in db:
  attr_dict = db[category]
  for attr in attr_dict:
    prob_arr = attr_dict[attr]
    mean = sum(prob_arr) / len(prob_arr)
    attr_dict[attr] = mean

with open('category_avg.json', 'w+') as out:
  json.dump(db, out, indent=4)