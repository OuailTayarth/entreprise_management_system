import { Poppins } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Enterprise HR Management Dashboard",
  description:
    "Comprehensive HR platform for managing employees, departments, onboarding, leave requests, and HR documentation. Streamline your workforce operations with real-time analytics and workflow automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={poppins.variable}>
        <DashboardWrapper>
          {children}{" "}
          <ToastContainer
            position="bottom-right"
            theme="dark"
            transition={Slide}
          />
        </DashboardWrapper>
      </body>
    </html>
  );
}
