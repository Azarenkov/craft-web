export async function createArt(type_banner: string, input: string) {
  try {
    const response = await fetch("http://localhost:8080/api/create_art", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type_banner, input }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null); // Парсим JSON ошибки
      const errorMessage =
        errorData?.message || "Request failed with unknown error";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}
