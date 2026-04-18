"use client";

import { useEffect, useState } from "react";
import { getDrivers } from "@/lib/api";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDrivers()
      .then(setDrivers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Driver Management</h1>
      
      <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">License</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Safety Score</th>
              <th className="px-6 py-4 text-left">Hours Driven</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8">Loading drivers...</td></tr>
            ) : drivers.length > 0 ? (
              drivers.map((d) => (
                <tr key={d._id} className="border-b last:border-0 hover:bg-muted/50 transition">
                  <td className="px-6 py-4 font-medium">{d.name}</td>
                  <td className="px-6 py-4">{d.licenseNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${d.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                          <div className={`h-2.5 rounded-full ${d.safetyScore > 80 ? 'bg-green-500' : d.safetyScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${d.safetyScore}%` }}></div>
                       </div>
                       <span className="text-xs">{d.safetyScore}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{d.totalHoursDriven} hrs</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-8">No drivers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
