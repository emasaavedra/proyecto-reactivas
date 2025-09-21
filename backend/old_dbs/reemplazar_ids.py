import json
import pandas as pd

# Archivos
json_path = "D:/10mo Semestre/reactivas/proyecto-reactivas/backend/db_new_tourneys.json"
csv_path = "D:/10mo Semestre/reactivas/proyecto-reactivas/backend/players_ids.csv"

# Leer JSON y CSV
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_df = pd.read_csv(csv_path)

# Crear diccionario: nombre -> Player ID real
name_to_id = dict(zip(ids_df["Player"], ids_df["Player ID"]))

# Reemplazar IDs 0 en players
for player in data["players"]:
    if player["id"] == 0:
        name = player["name"]
        if name in name_to_id:
            player["id"] = int(name_to_id[name])

# Guardar el JSON corregido
with open("db_fixed.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("Archivo db_fixed.json generado con IDs corregidos.")
