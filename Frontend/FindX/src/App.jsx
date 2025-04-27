import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import AdminDashBoard from './Components/AdminDashBoard';
import UserDashBoard from './Components/UserDashBoard';
import ProtectedRoute from './Components/ProtectedRoutes';
import NotFound from './Components/NotFound';
import ReportItem from './Components/ReportItem';
import UserReportedItems from './Components/UserReportedItems';
import SearchBarWithFilters from './Components/SearchBarWithFilters';
import UserClaims from './Components/UserClaims';
import ClaimsPage from './Components/ViewClaims';
import ViewClaims from './Components/ViewClaims';
import ManageAllUsers from './Components/ManageAllUsers';
import ManageAllItems from './Components/ManageAllItems';
import ManageClaims from './Components/ManageClaims';


function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard/reported-items"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserReportedItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard/report-item"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ReportItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard/search"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <SearchBarWithFilters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard/claims"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserClaims />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard/claims/view-claims"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ViewClaims />
            </ProtectedRoute>
          }
        />

       {/* Admin Routes */}

        <Route
          path="/admin/dashboard/manage-users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageAllUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard/manage-items"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageAllItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/manage-claims"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageClaims />
            </ProtectedRoute>
          }
        />
        
        
        

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
