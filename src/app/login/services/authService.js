export const loginUser = async (username, password) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/generate_token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Terjadi kesalahan jaringan.");
  }
};
