from PIL import Image
import os

fotos_dir = "jugadores_fotos"
salida_dir = "jugadores_fotos_comprimidas"
os.makedirs(salida_dir, exist_ok=True)

for archivo in os.listdir(fotos_dir):
    if not archivo.lower().endswith((".jpg", ".jpeg", ".png")):
        continue

    path_in = os.path.join(fotos_dir, archivo)
    path_out = os.path.join(salida_dir, archivo)

    try:
        img = Image.open(path_in)

        # Convertir a RGB si viene con canal alfa (por seguridad)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Guardar comprimida (calidad 70 es buena para web)
        img.save(path_out, "JPEG", quality=70, optimize=True)

        print(f"✅ Comprimida: {archivo}")
    except Exception as e:
        print(f"❌ Error con {archivo}: {e}")
