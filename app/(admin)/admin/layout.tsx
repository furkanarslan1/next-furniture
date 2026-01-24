import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSideBar from "./_components/AdminSidebar";
import AdminNavbar from "./_components/AdminNavbar";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AdminSideBar />

      <SidebarInset>
        <AdminNavbar />
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
