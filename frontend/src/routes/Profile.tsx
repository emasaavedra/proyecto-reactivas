export default function Profile() {
  // Later: auth integration. For now: stub values.
  return (
    <section className="card">
      <h1>Your Profile</h1>
      <ul className="meta">
        <li><strong>Name:</strong> You</li>
        <li><strong>Cards Owned:</strong> 0</li>
        <li><strong>Total Cards Available:</strong> 999+</li>
        <li><strong>Favorite Team:</strong> —</li>
      </ul>
      <button className="btn">Edit Profile</button>
    </section>
  );
}
