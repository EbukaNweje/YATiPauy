import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <NavLink
          to="deposits"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Deposits
        </NavLink>
        <NavLink
          to="withdrawals"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Withdrawals
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Users
        </NavLink>
      </nav>
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
