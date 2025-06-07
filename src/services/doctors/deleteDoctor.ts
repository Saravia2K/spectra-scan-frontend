export default async function deleteDoctor(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/${id}`, {
    method: "DELETE",
  });
  await response.json();
}
