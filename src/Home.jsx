

import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const API_URL = "http://localhost:3000";
const collections = {
  products: {
    label: "Products",
    endpoint: "products",
    fields: [
      { name: "title", label: "Product name", placeholder: "Everyday tote", required: true },
      { name: "price", label: "Price", type: "number", min: "0", step: "0.01", placeholder: "0.00", required: true },
      { name: "description", label: "Description", placeholder: "Optional product details" },
    ],
  },
  users: {
    label: "Users",
    endpoint: "users",
    fields: [
      { name: "userId", label: "User ID", placeholder: "USR-001", required: true },
      { name: "userName", label: "User name", placeholder: "Alex Morgan", required: true },
      { name: "address", label: "Address", placeholder: "Street, city, postal code", required: true },
    ],
  },
};

function CollectionManager({ collection }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/${collection.endpoint}`)
      .then((response) => setRecords(response.data))
      .catch(() => setError("Could not connect to JSON Server. Start it on port 3000."))
      .finally(() => setLoading(false));
  }, [collection.endpoint]);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    const record = Object.fromEntries(
      collection.fields.map(({ name, type }) => [
        name,
        type === "number" ? Number(form[name]) : (form[name] || "").trim(),
      ]),
    );

    try {
      const isEditing = editingId !== null;
      const response = await axios({
        url: isEditing
          ? `${API_URL}/${collection.endpoint}/${editingId}`
          : `${API_URL}/${collection.endpoint}`,
        method: isEditing ? "PATCH" : "POST",
        data: record,
      });
      const savedRecord = response.data;
      setRecords((current) => isEditing
        ? current.map((item) => item.id === editingId ? savedRecord : item)
        : [...current, savedRecord]);
      setNotice(isEditing ? "Record updated." : "Record added.");
      resetForm();
    } catch (saveError) {
      setError(saveError.message || "Could not save this record.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (record) => {
    setForm(Object.fromEntries(collection.fields.map(({ name }) => [name, record[name] ?? ""])));
    setEditingId(record.id);
    setError("");
    setNotice("");
  };

  const handleDelete = async (record) => {
    setError("");
    setNotice("");
    setDeletingId(record.id);
    try {
      await axios.delete(`${API_URL}/${collection.endpoint}/${record.id}`);
      setRecords((current) => current.filter((item) => item.id !== record.id));
      if (editingId === record.id) resetForm();
      setNotice("Record deleted.");
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete this record.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <section className="crud-section" aria-labelledby="record-form-title">
        <div className="crud-section-heading">
          <div>
            <p className="crud-eyebrow">{editingId === null ? "New record" : `Editing record #${editingId}`}</p>
            <h2 id="record-form-title">{editingId === null ? `Add ${collection.label.toLowerCase().slice(0, -1)}` : "Update record"}</h2>
          </div>
        </div>
        <form className="crud-form" onSubmit={handleSubmit}>
          {collection.fields.map((field) => (
            <label key={field.name}>
              {field.label}
              <input
                required={field.required}
                min={field.min}
                step={field.step}
                type={field.type || "text"}
                maxLength={field.type === "number" ? undefined : 160}
                value={form[field.name] ?? ""}
                onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                placeholder={field.placeholder}
              />
            </label>
          ))}
          <div className="crud-form-actions">
            <button className="crud-primary-button" disabled={saving} type="submit">
              {saving ? "Saving..." : editingId === null ? "Add record" : "Save changes"}
            </button>
            {editingId !== null && (
              <button className="crud-text-button" onClick={resetForm} type="button">Cancel</button>
            )}
          </div>
        </form>
      </section>

      {error && <p className="crud-message crud-error" role="alert">{error}</p>}
      {notice && <p className="crud-message crud-success" role="status">{notice}</p>}

      <section className="crud-section" aria-labelledby="record-list-title">
        <div className="crud-section-heading">
          <div>
            <p className="crud-eyebrow">Collection</p>
            <h2 id="record-list-title">All {collection.label.toLowerCase()} <span>{records.length}</span></h2>
          </div>
        </div>
        {loading ? (
          <p className="crud-empty" role="status">Loading {collection.label.toLowerCase()}...</p>
        ) : records.length === 0 ? (
          <p className="crud-empty">No records yet. Add one above to get started.</p>
        ) : (
          <div className="crud-table-wrap">
            <table className="crud-table">
              <thead>
                <tr>
                  {collection.fields.map((field) => <th key={field.name} scope="col">{field.label}</th>)}
                  <th scope="col"><span className="visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    {collection.fields.map((field, index) => (
                      <td key={field.name}>
                        {index === 0 && <span className="crud-product-id">Record #{record.id}</span>}
                        {field.name === "price" && record.price != null
                          ? `$${Number(record.price).toFixed(2)}`
                          : record[field.name] || "—"}
                      </td>
                    ))}
                    <td>
                      <div className="crud-row-actions">
                        <button
                          className="crud-text-button"
                          onClick={() => handleEdit(record)}
                          type="button"
                        >Edit</button>
                        <button
                          className="crud-delete-button"
                          disabled={deletingId === record.id}
                          onClick={() => handleDelete(record)}
                          type="button"
                        >{deletingId === record.id ? "Deleting..." : "Delete"}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

const Home = () => {
  const [activeCollection, setActiveCollection] = useState("users");
  const collection = collections[activeCollection];

  return (
    <main className="crud-page">
      <header className="crud-header">
        <div>
          <p className="crud-eyebrow">Local JSON Server</p>
          <h1>Record manager</h1>
        </div>
        <span className="crud-connection">localhost:3000</span>
      </header>
      <div className="crud-tabs" aria-label="Collections" role="group">
        {Object.entries(collections).map(([key, item]) => (
          <button
            aria-pressed={activeCollection === key}
            className={activeCollection === key ? "crud-tab is-active" : "crud-tab"}
            key={key}
            onClick={() => setActiveCollection(key)}
            type="button"
          >{item.label}</button>
        ))}
      </div>
      <CollectionManager collection={collection} key={activeCollection} />
    </main>
  );
};

export default Home;
