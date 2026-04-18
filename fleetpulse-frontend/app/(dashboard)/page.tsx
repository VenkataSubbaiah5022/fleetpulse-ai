"use client";

import { useEffect, useState } from "react";
import KpiCard from "@/components/dashboard/KpiCard";
import { Card, CardContent } from "@/components/ui/card";
import FleetMap from "@/components/dashboard/FleetMap";
import FuelChart from "@/components/dashboard/FuelChart";
import DriverChart from "@/components/dashboard/DriverChart";
import { getDashboardKPIs, getAlerts } from "@/lib/api";

export default function DashboardPage() {
  const [kpis, setKpis] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    alertsToday: 0,
    avgFuelEfficiency: "0 km/l"
  });
  const [recentAlerts, setRecentAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kpiData = await getDashboardKPIs();
        setKpis(kpiData);

        const alertsData = await getAlerts();
        setRecentAlerts(alertsData.slice(0, 5)); // Keep latest 5
      } catch (error) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* 🔥 KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Vehicles" value={loading ? "..." : kpis.totalVehicles.toString()} />
        <KpiCard title="Active Vehicles" value={loading ? "..." : kpis.activeVehicles.toString()} />
        <KpiCard title="Alerts Today" value={loading ? "..." : kpis.alertsToday.toString()} />
        <KpiCard title="Avg Fuel Efficiency" value={loading ? "..." : kpis.avgFuelEfficiency} />
      </div>

      {/* 📊 CHARTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Fuel Usage</h2>
            <FuelChart />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Driver Behavior</h2>
            <DriverChart />
          </CardContent>
        </Card>
      </div>

      {/* 🗺️ MAP + ALERTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Live Fleet Map</h2>
            <FleetMap />
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Recent Alerts</h2>
            <ul className="space-y-2 text-sm">
              {loading ? (
                <li>Loading alerts...</li>
              ) : recentAlerts.length > 0 ? (
                recentAlerts.map((alert, idx) => (
                  <li key={idx}>
                    {alert.severity === 'Critical' ? '🚨' : alert.severity === 'High' ? '⚠️' : '🔧'} {alert.message} - {alert.vehicleId?.name || 'Unknown'}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No active alerts.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}