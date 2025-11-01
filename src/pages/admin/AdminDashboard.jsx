import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import Profile from '../../components/admin/section/Profile'
import IssueTable from '../../components/admin/section/IssueTable'
import Subscription from '../../components/admin/section/Subscription'

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Subscription />
        <Profile />
        <IssueTable />
    </AdminLayout>
  )
}

export default AdminDashboard
