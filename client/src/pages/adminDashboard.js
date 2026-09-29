import React, { useState } from 'react';
import Sidebar from "../components/adminDashboard/sidebar/Sidebar";
import Main from "../components/adminDashboard/main/Main";
import AdminManagement from "../components/adminDashboard/adminManagement/AdminManagement";
import Spam from "../components/adminDashboard/spamManagement/Spam";
import UsersManagement from "../components/adminDashboard/usersManagement/UsersManagement";

const AdminDashboard = () => {
  const [adminMenu, setAdminMenu] = useState(1);

  return (
    <div className="admin_dashboard_container container-fluid p-0 bg-light" style={{ minHeight: "100vh" }}>
      <div className="d-flex align-items-stretch w-100 min-vh-100">
        <div className="flex-shrink-0 bg-white border-end border-light-subtle shadow-sm" style={{ width: "260px", minHeight: "100vh" }}>
          <Sidebar adminMenu={adminMenu} setAdminMenu={setAdminMenu} />
        </div>
        
        <div className="flex-grow-1 p-4 overflow-y-auto" style={{ background: "#f8fafc" }}>
          <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-light-subtle">
            <div>
              <h4 className="fw-bold text-dark m-0 tracking-tight">Admin Control Panel</h4>
              <p className="text-muted small m-0 mt-1">Manage system configurations, analytics metrics, and spam compliance logs</p>
            </div>
          </div>

          <div className="dashboard_view_content mt-3">
            {adminMenu === 1 && <Main />}
            {adminMenu === 2 && <AdminManagement />}
            {adminMenu === 3 && <Spam />}
            {adminMenu === 4 && <UsersManagement />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
