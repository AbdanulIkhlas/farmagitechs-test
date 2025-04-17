"use client";

export default function GroupTable({ groups, onEdit, onDelete }) {
  if (!groups || groups.length === 0) {
    return <p className="text-gray-600 mt-4">Tidak ada data group.</p>;
  }

  const sortedGroups = [...groups].sort((a, b) => b.group_id - a.group_id);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-blue-600">Daftar Group</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nama Group</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sortedGroups.map((group) => (
            <tr key={group.group_id} className="text-center">
              <td className="border px-4 py-2 text-gray-700">
                {group.group_id}
              </td>
              <td className="border px-4 py-2 text-gray-700">
                {group.group_name}
              </td>
              <td className="border px-4 py-2 text-gray-700">{group.active}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEdit(group)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(group.group_id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
