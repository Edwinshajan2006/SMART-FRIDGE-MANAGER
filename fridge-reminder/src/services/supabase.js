const API_URL = "https://YOUR_SUPABASE_PROJECT.supabase.co/rest/v1";
const API_KEY = "YOUR_SUPABASE_ANON_KEY";

export async function fetchItemsFromSupabase() {
  const response = await fetch(`${API_URL}/fridge_items?select=*`, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) throw new Error("Failed to load items from Supabase");
  return response.json();
}

export async function saveItemsToSupabase(items) {
  const response = await fetch(`${API_URL}/fridge_items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(items),
  });

  if (!response.ok) throw new Error("Failed to save items to Supabase");
  return response.json();
}
