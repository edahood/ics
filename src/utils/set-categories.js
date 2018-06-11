
export default function setCategories(categories) {
    return Array.isArray(categories) ? categories.join(",") : "";
}
