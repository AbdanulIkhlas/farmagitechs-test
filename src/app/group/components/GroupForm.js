"use client";

import { useState, useEffect } from "react";

const initialForm = {
  group_id: -1,
  group_name: "",
  active: "yes",
};

export default function GroupForm({ onSubmit, editingGroup, setEditingGroup }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingGroup) {
      setForm(editingGroup);
    } else {
      setForm(initialForm);
    }
  }, [editingGroup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await onSubmit(form);
    if (res?.success) {
      setForm(initialForm);
      setEditingGroup(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block mb-1 font-medium text-gray-600">
          Nama Group
        </label>
        <input
          type="text"
          name="group_name"
          value={form.group_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-600"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-600">
          Status Aktif
        </label>
        <select
          name="active"
          value={form.active}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-600"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          {form.group_id !== -1 ? "Update Group" : "Tambah Group"}
        </button>
        {editingGroup && (
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setForm(initialForm);
              setEditingGroup(null);
            }}
          >
            Batal Edit
          </button>
        )}
      </div>
    </form>
  );
}
