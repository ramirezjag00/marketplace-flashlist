import json
import csv

with open ("Products.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)
    data = {"items": []}
    for row in reader:
        print (row)
        data["items"].append({
            "id": int(row[0]),
            "name": row[1],
            "barcode": int(row[2]),
            "price": float(row[3]),
            "brand": row[4],
            "category": row[5]
        })

with open ("products.json", "w") as f:
    json.dump(data, f, indent=2)