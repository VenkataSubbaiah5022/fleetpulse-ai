"use client";

import { useEffect, useState } from "react";
import { getVehicles } from "@/lib/api";

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Fleet Management</h1>
      
      <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Reg Number</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Driver</th>
              <th className="px-6 py-4">Fuel Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8">Loading vehicles...</td></tr>
            ) : vehicles.length > 0 ? (
              vehicles.map((v) => (
                <tr key={v._id} className="border-b last:border-0 hover:bg-muted/50 transition">
                  <td className="px-6 py-4 font-medium">{v.name}</td>
                  <td className="px-6 py-4">{v.registrationNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${v.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{v.assignedDriver?.name || 'Unassigned'}</td>
                  <td className="px-6 py-4">{v.fuelEfficiency} km/l</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-8">No vehicles found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
