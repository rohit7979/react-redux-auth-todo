import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Product Catalog</h1>
            <p className="text-gray-600 mt-1">
              Browse the products loaded from DummyJSON and inspect the details.
            </p>
          </div>

          <button
            onClick={() => dispatch(fetchProducts())}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh List
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Total Products
            </p>
            <p className="mt-4 text-4xl font-bold">{products.length}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Data Source
            </p>
            <p className="mt-4 text-lg">DummyJSON Products API</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Status
            </p>
            <p className="mt-4 text-lg">
              {loading ? "Loading..." : error ? "Failed" : "Ready"}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white shadow">
          {loading ? (
            <div className="p-6 text-center">Loading products...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.id}</td>
                    <td className="px-4 py-3 text-sm">{product.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">${product.price}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
