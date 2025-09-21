
ruta = "D:/10mo Semestre/reactivas/proyecto-reactivas/backend/db_fixed.json"
output = "D:/10mo Semestre/reactivas/proyecto-reactivas/backend/db_final.json"
import json

# Cargar el JSON original
with open(ruta, "r", encoding="utf-8") as f:
    data = json.load(f)

# Crear un índice: torneo -> lista de player IDs
tournament_to_players = {}
for player in data["players"]:
    t_name = player["tournament"]
    t_id = player["id"]
    tournament_to_players.setdefault(t_name, []).append(t_id)

# Agregar "players" a cada torneo en la lista de tournaments
for tournament in data.get("tournaments", []):
    t_name = tournament["tournament"]
    tournament["players"] = tournament_to_players.get(t_name, [])

# Guardar el archivo actualizado
with open(output, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("db.json actualizado: cada torneo ahora tiene la lista de players.")
