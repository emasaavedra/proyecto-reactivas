import os
import json

# === 1. Rutas de trabajo ===
json_path = "backend\db.json"           # Tu JSON original
fotos_dir = "jugadores_fotos"          # Carpeta donde guardaste las fotos
salida_path = "backend\jugadores_actualizado.json"  # Archivo de salida

# === 2. Cargar JSON ===
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

players = data.get("players", [])

# === 3. Revisar cada jugador ===
sin_foto = set()  # lista para los que no tienen imagen

for player in players:
    nombre = player.get("name")
    if not nombre:
        continue

    foto_path = os.path.join(fotos_dir, f"{nombre}.jpg")

    if os.path.exists(foto_path):
        player["photo"] = foto_path.replace("\\", "/")
        print(f"✅ Foto encontrada para {nombre}")
    else:
        sin_foto.add(nombre)

# === 4. Guardar el nuevo JSON ===
with open(salida_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

# === 5. Reporte final ===
print(f"\n✅ JSON actualizado guardado en: {salida_path}")

if sin_foto:
    print("\n⚠️ No se encontró foto para los siguientes jugadores:")
    for nombre in sin_foto:
        print(f" - {nombre}")
else:
    print("\n🎉 Se encontraron fotos para todos los jugadores.")
