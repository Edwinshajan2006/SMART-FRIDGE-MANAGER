const API_BASE = "http://localhost:5000/api";

export async function fetchItemsFromBackend() {
  const response = await fetch(`${API_BASE}/items`);
  if (!response.ok) throw new Error("Failed to load items");
  const data = await response.json();
  return data.items || [];
}

export async function saveItemsToBackend(items) {
  const response = await fetch(`${API_BASE}/items`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) throw new Error("Failed to save items");
  const data = await response.json();
  return data.items || [];
}

export async function clearItemsFromBackend() {
  const response = await fetch(`${API_BASE}/items`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to clear items");
  const data = await response.json();
  return data.items || [];
}
