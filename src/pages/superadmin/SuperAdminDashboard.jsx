import React from 'react'
import SuperAdminLayout from '../../layout/SuperAdminLayout'
import Overview from '../../components/superadmin/section/Overview'
import RegisterForm from '../../components/superadmin/section/RegisterForm'
import UserTable from '../../components/superadmin/section/UserTable'

const SuperAdminDashboard = () => {
  return (
    <SuperAdminLayout>
        <Overview />
        <RegisterForm />
        <UserTable
  users={[
    {
      name: "Nitin Kumar",
      email: "nitin@example.com",
      isActive: true,
      registeredDate: "2025-10-20",
    },
    {
      name: "Priya Sharma",
      email: "priya@example.com",
      isActive: false,
      registeredDate: "2025-09-10",
    },
  ]}
/>
    </SuperAdminLayout>
  )
}

export default SuperAdminDashboard
