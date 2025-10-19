import os
import json
import requests
from bs4 import BeautifulSoup

# === 1. Leer nombres desde el JSON ===
with open("backend\db.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Extraer solo los nombres de los jugadores
jugadores = [p["name"] for p in data.get("players", []) if "name" in p]

print(f"Se encontraron {len(jugadores)} jugadores en el JSON.\n")

# === 2. Preparar carpeta y cabeceras ===
os.makedirs("jugadores_fotos", exist_ok=True)

base_url = "https://liquipedia.net/valorant/"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

# === 3. Scraping e imágenes ===
for jugador in jugadores:
    url = f"{base_url}{jugador}"
    print(f"Obteniendo imagen de {jugador} ({url})...")

    try:
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        infobox = soup.find("div", class_="infobox-image")
        if not infobox:
            print(f"⚠️ No se encontró infobox para {jugador}")
            continue

        img_tag = infobox.find("img")
        if not img_tag or "src" not in img_tag.attrs:
            print(f"⚠️ No se encontró imagen para {jugador}")
            continue

        img_url = img_tag["src"]

        # Completar URLs relativas
        if img_url.startswith("//"):
            img_url = "https:" + img_url
        elif img_url.startswith("/"):
            img_url = "https://liquipedia.net" + img_url

        # Descargar imagen
        img_data = requests.get(img_url, headers=headers).content

        # Guardar
        file_path = os.path.join("jugadores_fotos", f"{jugador}.jpg")
        with open(file_path, "wb") as f:
            f.write(img_data)

        print(f"✅ Imagen guardada: {file_path}")

    except Exception as e:
        print(f"❌ Error con {jugador}: {e}")
