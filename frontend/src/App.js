import { useEffect, useState } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  async function fetchProducts() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Impossible de récupérer les produits");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // mini validation
    if (!form.name.trim() || form.price === "") {
      setError("Nom et prix sont obligatoires");
      return;
    }

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
    };

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Erreur lors de l'ajout");
      }

      // reset form
      setForm({ name: "", price: "", description: "" });

      // refresh list
      await fetchProducts();
    } catch (e) {
      setError(e.message || "Erreur");
    }
  }

  async function handleDelete(id) {
  const ok = window.confirm("Supprimer ce produit ?");
  if (!ok) return;

  try {
    setError("");

    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Erreur lors de la suppression");
    }

    await fetchProducts();

  } catch (e) {
    setError(e.message || "Erreur");
  }
}


  return (
    <div className="container">
      <h1>Mini-app de Gestion de produits</h1>

      <section className="card">
        <h2>Ajouter un produit</h2>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Nom *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex: Clavier"
            />
          </label>

          <label>
            Prix *
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="Ex: 29.99"
            />
          </label>

          <label>
            Description
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optionnel"
            />
          </label>

          <button type="submit">Ajouter</button>
        </form>

        {error && <p className="error">❌ {error}</p>}
      </section>

      <section className="card">
        <h2>Liste des produits</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : products.length === 0 ? (
          <p>Aucun produit pour le moment.</p>
        ) : (
          <ul className="list">
            {products.map((p) => (
              <li key={p._id} className="list-item">
                <div>
                  <strong>{p.name}</strong>
                  <div className="muted">{p.description}</div>
                </div>
                <div className="right">
                  <div className="price">{Number(p.price).toFixed(2)} €</div>
                  <button className="btn-delete" onClick={() => handleDelete(p._id)}>
                    Supprimer
                  </button>
                </div>
              </li>

            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
