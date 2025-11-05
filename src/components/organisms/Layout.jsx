import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import QuickAddModal from "@/components/organisms/QuickAddModal";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="lg:ml-64">
        <Header 
          onMenuToggle={() => setSidebarOpen(true)}
          onQuickAdd={() => setQuickAddOpen(true)}
        />
        
        <main className="flex-1">
          <div className="px-4 lg:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      <QuickAddModal 
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default Layout;