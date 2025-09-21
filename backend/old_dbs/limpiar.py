import json

def rename_keys_in_json(file_path: str, mapping: dict, output_path: str = None):
    """
    Renombra claves en un JSON según un mapeo dado.

    Args:
        file_path (str): ruta del archivo JSON original
        mapping (dict): diccionario con {clave_vieja: clave_nueva}
        output_path (str): ruta donde guardar el JSON modificado.
                           Si es None, sobreescribe el archivo original.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    def rename_in_dict(d: dict):
        for old_key, new_key in mapping.items():
            if old_key in d:
                d[new_key] = d.pop(old_key)
        return d

    # si el json tiene listas (ej: "players")
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, list):
                data[key] = [rename_in_dict(item) if isinstance(item, dict) else item for item in value]
            elif isinstance(value, dict):
                data[key] = rename_in_dict(value)

    # guardar
    if output_path is None:
        output_path = file_path

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"Archivo guardado en {output_path}")

ruta = "D:/10mo Semestre/reactivas/proyecto-reactivas/backend/db.json"
output = "D:/10mo Semestre/reactivas/proyecto-reactivas/backend/db_new_keys.json"
mapping = {
    "Tournament": "tournament",
    "Stage": "stages",
    "Match Type": "match_type",
    "Player": "name",
    "Teams": "team",
    "Agents": "agents",
    "Rounds Played": "rounds_played",
    "Rating": "rating",
    "Average Combat Score": "acs",
    "Kills:Deaths": "kd",
    "Kill, Assist, Trade, Survive %": "kast",
    "Average Damage Per Round": "adr",
    "Kills Per Round": "kpr",
    "Assists Per Round": "apr",
    "First Kills Per Round": "fkpr",
    "First Deaths Per Round": "fdpr",
    "Headshot %": "hs",
    "Clutch Success %": "clutch_success",
    "Clutches (won/played)": "clutches",
    "Maximum Kills in a Single Map": "max_kills",
    "Kills": "kills",
    "Deaths": "deaths",
    "Assists": "assists",
    "First Kills": "fk",
    "First Deaths": "fd",
}
rename_keys_in_json(ruta, mapping, output)