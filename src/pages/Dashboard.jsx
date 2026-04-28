import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../features/products/productSlice";

const initialForm = {
  title: "",
  price: "",
  category: "",
  stock: "",
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.price || !form.category || !form.stock) {
      setFeedback("Please complete every field before saving.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      stock: Number(form.stock),
    };

    if (editingId) {
      dispatch(updateProduct({ ...payload, id: editingId }));
      setFeedback("Product updated successfully.");
    } else {
      dispatch(addProduct(payload));
      setFeedback("New product created successfully.");
    }

    setForm(initialForm);
    setEditingId(null);

    window.setTimeout(() => setFeedback(""), 3000);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setFeedback("");
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setFeedback("");
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setFeedback("Product removed successfully.");
    window.setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-sky-500 p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] opacity-80">
              Product Records Summary
            </p>
            <h1 className="mt-4 text-4xl font-bold">{products.length}</h1>
            <p className="mt-2 text-slate-100">
              Total products currently available in the Redux store.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs uppercase opacity-70">Loading</p>
                <p className="mt-2 text-2xl">{loading ? "Yes" : "No"}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs uppercase opacity-70">Last action</p>
                <p className="mt-2 text-2xl">
                  {editingId ? "Editing" : "Create / Delete"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-xl font-semibold">Create / Update Product</h2>
            <p className="mt-2 text-gray-600">
              Use the form below to add new items or update existing products.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Product title"
                  className="border rounded-xl p-3 w-full"
                />

                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Category"
                  className="border rounded-xl p-3 w-full"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  type="number"
                  placeholder="Price"
                  className="border rounded-xl p-3 w-full"
                />

                <input
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  type="number"
                  placeholder="Stock"
                  className="border rounded-xl p-3 w-full"
                />
              </div>

              {feedback && (
                <p className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
                  {feedback}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700">
                  {editingId ? "Update Product" : "Create Product"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full rounded-2xl border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Product Manager</h2>
              <p className="text-gray-600 mt-1">
                Read, update, and delete product records directly in Redux.
              </p>
            </div>

            <button
              onClick={() => dispatch(fetchProducts())}
              className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Reload from API
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            {error ? (
              <div className="rounded-xl bg-red-50 p-4 text-red-700">
                {error}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-3 text-left text-sm font-semibold">ID</th>
                    <th className="p-3 text-left text-sm font-semibold">Title</th>
                    <th className="p-3 text-left text-sm font-semibold">Category</th>
                    <th className="p-3 text-left text-sm font-semibold">Price</th>
                    <th className="p-3 text-left text-sm font-semibold">Stock</th>
                    <th className="p-3 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="p-3 text-sm text-gray-600">{product.id}</td>
                      <td className="p-3 text-sm">{product.title}</td>
                      <td className="p-3 text-sm text-gray-600">{product.category}</td>
                      <td className="p-3 text-sm text-gray-800">${product.price}</td>
                      <td className="p-3 text-sm text-gray-800">{product.stock}</td>
                      <td className="p-3 text-right text-sm">
                        <button
                          onClick={() => handleEdit(product)}
                          className="mr-2 rounded-lg bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
