import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layout/SuperAdminLayout';
import RegisterForm from '../../components/superadmin/section/RegisterForm';
import UserTable from '../../components/superadmin/section/UserTable';
import { getUsers } from '../../services/superadmin/api';

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Fetch users once
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await getUsers();
      if (data.status && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to fetch users');
    }
    setLoadingUsers(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handler to add new user to the list
  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  // Handler to remove a user from the list
  const handleRemoveUser = (userId) => {
    setUsers(users.filter((u) => u._id !== userId));
  };

  return (
    <SuperAdminLayout>
      <RegisterForm onAddUser={handleAddUser} />
      <UserTable
        users={users}
        loading={loadingUsers}
        onDeleteUser={handleRemoveUser}
      />
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboard;
