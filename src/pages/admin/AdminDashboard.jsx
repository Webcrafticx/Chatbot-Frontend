import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import Profile from '../../components/admin/section/Profile'
import IssueTable from '../../components/admin/section/IssueTable'

const AdminDashboard = () => {
  return (
    <AdminLayout>
        <Profile />
        <IssueTable />
    </AdminLayout>
  )
}

export default AdminDashboard
