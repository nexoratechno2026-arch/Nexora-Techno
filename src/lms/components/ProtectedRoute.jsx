import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/lms/login" state={{ from: location }} replace />;
  }

  if (!loading && !profile) {
    // If the database trigger failed and they have no profile, we shouldn't trap them in a spinner.
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl max-w-sm text-center">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h2 className="text-slate-900 font-bold mb-2">Profile Not Found</h2>
          <p className="text-slate-500 text-sm mb-4">Your account was created, but your profile data is missing from the database. If you are supposed to be staff, please request access.</p>
          <button onClick={() => window.location.href = '/lms/admin-setup'} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition-colors">
            Request Staff Access
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If profile is incomplete (intern with no college/domain), redirect to onboarding
  if (profile.role === "intern") {
    const accountCreated = new Date(user.created_at || profile.created_at || Date.now());
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    if (accountCreated < oneYearAgo) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xl max-w-md text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h2 className="text-slate-900 text-2xl font-bold mb-2">Access Expired</h2>
            <p className="text-slate-500 mb-6">
              Your access to the Nexora Techno LMS has expired. Intern accounts are only active for 1 year after creation. 
              <br/><br/>
              If you have successfully completed your internship, you can still view and download your certificate using your Certificate ID on our public verification portal.
            </p>
            <button onClick={() => window.location.href = '/verify'} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2">
              Go to Verification Portal
            </button>
          </div>
        </div>
      );
    }

    if (!profile.college || !profile.domain) {
      if (location.pathname !== "/lms/onboarding") {
        return <Navigate to="/lms/onboarding" replace />;
      }
    }
  }

  if (requiredRole && profile.role !== requiredRole) {
    if (profile.role === "admin") return <Navigate to="/lms/admin/dashboard" replace />;
    if (profile.role === "trainer") return <Navigate to="/lms/trainer/dashboard" replace />;
    return <Navigate to="/lms/intern/dashboard" replace />;
  }

  return children;
}
