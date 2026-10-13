import { Outlet } from "react-router-dom";
import AppSidebar from "../AppSidebar";
import { SidebarProvider } from "../ui/sidebar";

function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="container-custom">
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  )
}

export default Layout;
