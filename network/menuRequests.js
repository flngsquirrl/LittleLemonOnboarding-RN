const MENU_ITEMS_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export async function getMenuItems() {
  try {
    const response = await fetch(MENU_ITEMS_URL);
    const json = await response.json();
    return json.menu;
  } catch (error) {
    console.error("Error fetching menu items", error);
  }
}
