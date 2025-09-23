export default function Profile() {
  // Later: auth integration. For now: stub values.
  return (
    <section className="card">
      <h1>Tu Perfil</h1>
      <ul className="meta">
        <li><strong>Nombre:</strong> Tú</li>
        <li><strong>Cartas:</strong> 0</li>
        <li><strong>Total de Cartas Disponibles:</strong> 999+</li>
        <li><strong>Equipo Favorito:</strong> —</li>
      </ul>
      <button className="btn">Editar Perfil</button>
    </section>
  );
}
