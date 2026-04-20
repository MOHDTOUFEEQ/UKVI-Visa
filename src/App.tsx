import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { TerminologyProvider } from "@/context/TerminologyContext";
import { ApplicationProvider } from "@/context/ApplicationContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Eligibility from "./pages/Eligibility";
import Dashboard from "./pages/Dashboard";
import Glossary from "./pages/Glossary";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import EmailPreview from "./pages/EmailPreview";
import DownloadPdf from "./pages/DownloadPdf";

import ApplicationLayout from "./pages/apply/ApplicationLayout";
import StepPersonal from "./pages/apply/StepPersonal";
import StepPassport from "./pages/apply/StepPassport";
import StepEducation from "./pages/apply/StepEducation";
import StepCAS from "./pages/apply/StepCAS";
import StepFinance from "./pages/apply/StepFinance";
import StepDocuments from "./pages/apply/StepDocuments";
import StepTB from "./pages/apply/StepTB";
import StepIHS from "./pages/apply/StepIHS";
import StepReview from "./pages/apply/StepReview";
import StepPayment from "./pages/apply/StepPayment";
import StepConfirmation from "./pages/apply/StepConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TerminologyProvider>
        <ApplicationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/eligibility" element={<Eligibility />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/help" element={<Help />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/email-preview" element={<EmailPreview />} />
                <Route path="/download" element={<DownloadPdf />} />

                <Route path="/apply" element={<ApplicationLayout />}>
                  <Route index element={<Navigate to="/apply/personal" replace />} />
                  <Route path="personal" element={<StepPersonal />} />
                  <Route path="passport" element={<StepPassport />} />
                  <Route path="education" element={<StepEducation />} />
                  <Route path="cas" element={<StepCAS />} />
                  <Route path="finance" element={<StepFinance />} />
                  <Route path="documents" element={<StepDocuments />} />
                  <Route path="tb-test" element={<StepTB />} />
                  <Route path="ihs" element={<StepIHS />} />
                  <Route path="review" element={<StepReview />} />
                  <Route path="payment" element={<StepPayment />} />
                  <Route path="confirmation" element={<StepConfirmation />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ApplicationProvider>
      </TerminologyProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
