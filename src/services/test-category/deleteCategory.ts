export default async function deleteCategory(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test-question/category/${id}`, {
    method: "DELETE",
  });
  await response.json();
}
