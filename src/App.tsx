import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { RoleProvider } from '@/context/RoleContext';
import { PublicLayout } from '@/layouts/PublicLayout';
import { LandingPage } from '@/pages/LandingPage';
import { JobSearchPage } from '@/pages/JobSearchPage';
import { JobDetailsPage } from '@/pages/JobDetailsPage';
import { CompaniesPage } from '@/pages/CompaniesPage';
import { CompanyPage } from '@/pages/CompanyPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { AuthPage } from '@/pages/AuthPage';
import { JobSeekerDashboard } from '@/pages/JobSeekerDashboard';
import { ProfilePage } from '@/pages/ProfilePage';
import { ResumePage } from '@/pages/ResumePage';
import { EmployerDashboard } from '@/pages/EmployerDashboard';
import { PostJobPage } from '@/pages/PostJobPage';
import { ManageJobsPage } from '@/pages/ManageJobsPage';
import { ApplicantsPage } from '@/pages/ApplicantsPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { AdminTablePage } from '@/pages/AdminTablePage';
import { MessagingPage } from '@/pages/MessagingPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RoleProvider>
          <BrowserRouter>
            <Routes>
              {/* Public pages */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/jobs" element={<JobSearchPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/companies/:id" element={<CompanyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>

              {/* Auth */}
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/register" element={<AuthPage mode="register" />} />
              <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
              <Route path="/reset-password" element={<AuthPage mode="reset" />} />

              {/* Job Seeker */}
              <Route path="/dashboard" element={<JobSeekerDashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/applications" element={<JobSeekerDashboard />} />
              <Route path="/saved-jobs" element={<JobSeekerDashboard />} />

              {/* Employer */}
              <Route path="/employer" element={<EmployerDashboard />} />
              <Route path="/employer/post-job" element={<PostJobPage />} />
              <Route path="/employer/jobs" element={<ManageJobsPage />} />
              <Route path="/employer/applicants" element={<ApplicantsPage />} />
              <Route path="/employer/company" element={<CompanyPage />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminTablePage type="users" />} />
              <Route path="/admin/employers" element={<AdminTablePage type="employers" />} />
              <Route path="/admin/jobs" element={<AdminTablePage type="jobs" />} />
              <Route path="/admin/applications" element={<AdminTablePage type="applications" />} />
              <Route path="/admin/reports" element={<AdminTablePage type="reports" />} />

              {/* Shared */}
              <Route path="/messages" element={<MessagingPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </BrowserRouter>
        </RoleProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
