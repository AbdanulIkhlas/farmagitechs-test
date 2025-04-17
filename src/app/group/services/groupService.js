"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getToken = () => {
  return localStorage.getItem("token");
};

export async function createGroup(token, payload) {
  const res = await fetch(`${BASE_URL}/api/group/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function fetchGroups(token, page = 1, filters = {}) {
  const res = await fetch(`${BASE_URL}/api/group/list?p=${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(filters),
  });
  return res.json();
}

export async function getGroupById(token, id) {
  console.log("🔍 API URL:", `${BASE_URL}/api/group/get`);
  console.log("🔐 Token:", token);
  console.log("🔎 ID:", id);

  const res = await fetch(`${BASE_URL}/api/group/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  const text = await res.text(); // 👉 baca mentah dulu
  console.log("📦 Response Text:", text);

  try {
    return JSON.parse(text); // baru parse JSON kalau valid
  } catch (err) {
    throw new Error("Gagal parse JSON: " + text);
  }
}


export async function updateGroup(token, payload) {
  const res = await fetch(`${BASE_URL}/api/group/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteGroup(token, group_id) {
  const res = await fetch(`${BASE_URL}/api/group/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ group_id }),
  });
  return res.json();
}
