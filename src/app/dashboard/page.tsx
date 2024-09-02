"use client";

import Loading from "@/components/loading";
import AdminTheme from "@/components/themes/layout/admin-theme";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Loading />

  return (
    <AdminTheme>
      <p>Graficos</p>
      {user.name}
      {user.email}
    </AdminTheme>
  );
}
export default Dashboard;