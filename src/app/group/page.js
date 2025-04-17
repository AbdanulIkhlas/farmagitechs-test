"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupTable from "./components/GroupTable";
import GroupForm from "./components/GroupForm";
import GroupSearch from "./components/GroupSearch";
import {
  fetchGroups,
  createGroup,
  deleteGroup,
  updateGroup,
  getGroupById,
} from "./services/groupService";

export default function GroupPage() {
  const [token, setToken] = useState(null);
  const [groups, setGroups] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      loadGroups(savedToken);
    }
  }, []);

  const loadGroups = async (tokenValue) => {
    const result = await fetchGroups(tokenValue, 1, {
      id: "",
      name: "",
      active: "",
    });

    if (result.success !== false && result.response?.data) {
      const sorted = result.response.data.sort(
        (a, b) => b.group_id - a.group_id
      );
      setGroups(sorted);
    } else {
      toast.error("Gagal memuat data group.");
    }
  };

  const handleSubmit = async (data) => {
    if (!token) return;

    let res;
    if (editingGroup) {
      res = await updateGroup(token, data);
    } else {
      res = await createGroup(token, data);
    }

    if (res.metaData?.code === 200) {
      toast.success(res.metaData.message[0]);
      setEditingGroup(null);
      await loadGroups(token);
      return { success: true };
    } else {
      toast.error("Gagal menyimpan data group");
      return { success: false };
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;
    if (!confirm("Yakin ingin menghapus group ini?")) return;

    const res = await deleteGroup(token, id);
    if (res.metaData?.code === 200) {
      toast.success("Group berhasil dihapus");
      loadGroups(token);
    } else {
      toast.error("Gagal hapus group");
    }
  };

  const handleSearch = async (searchId) => {
    if (!token) return;

    if (!searchId) {
      await loadGroups(token);
      return;
    }

    try {
      const res = await getGroupById(searchId);
      if (res?.metaData?.code === 200 && res.response?.data) {
        setGroups([res.response.data]); // tampilkan satu data
      } else {
        toast.error("Data tidak ditemukan");
        setGroups([]); // kosongkan hasil jika tidak ditemukan
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat mencari group");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Manajemen Data Group
        </h1>

        <GroupForm
          onSubmit={handleSubmit}
          editingGroup={editingGroup}
          setEditingGroup={setEditingGroup}
        />

        <div className="mt-8">
          <GroupSearch onSearch={handleSearch} />
        </div>

        <div className="mt-6">
          <GroupTable
            groups={groups}
            onEdit={(group) => setEditingGroup(group)}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
