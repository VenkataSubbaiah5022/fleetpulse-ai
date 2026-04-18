"use client";

import { useEffect, useState } from "react";
import { getAlerts } from "@/lib/api";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlerts()
      .then(setAlerts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">System Alerts</h1>
      
      <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Severity</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Vehicle</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8">Loading alerts...</td></tr>
            ) : alerts.length > 0 ? (
              alerts.map((a) => (
                <tr key={a._id} className="border-b last:border-0 hover:bg-muted/50 transition">
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                       a.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                       a.severity === 'High' ? 'bg-orange-100 text-orange-700' : 
                       'bg-yellow-100 text-yellow-700'
                     }`}>
                       {a.severity}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{a.type}</td>
                  <td className="px-6 py-4">{a.message}</td>
                  <td className="px-6 py-4">{a.vehicleId?.name || '-'}</td>
                  <td className="px-6 py-4">
                    {a.resolved ? (
                      <span className="text-green-600 font-semibold text-xs border border-green-600 px-2 py-1 rounded-full">Resolved</span>
                    ) : (
                      <span className="text-red-600 font-semibold text-xs border border-red-600 px-2 py-1 rounded-full">Active</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-8">No alerts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
