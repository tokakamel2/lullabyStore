import { Package, PauseCircle, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/features/products/api";

export const metadata = {
  title: "Admin Dashboard | Lullaby Candle Co."
};

const statCards = [
  { key: "total", label: "Total products", icon: Package },
  { key: "active", label: "Active products", icon: Sparkles },
  { key: "inactive", label: "Inactive products", icon: PauseCircle }
] as const;

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.key} className="bg-card/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <Icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="font-serif text-5xl font-semibold">{stats[stat.key]}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
