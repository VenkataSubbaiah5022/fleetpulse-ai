"use client";

import { useEffect, useState } from "react";
import { getAlerts, resolveAlert } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = () => {
    setLoading(true);
    getAlerts()
      .then(setAlerts)
      .catch((err) => toast.error("Failed to load alerts"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      await resolveAlert(id);
      toast.success("Alert marked as resolved!");
      loadAlerts(); // Re-fetch alerts
    } catch (err: any) {
      toast.error(err.message || "Failed to resolve alert");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">System Alerts</h1>
      </div>
      
      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Loading alerts...</TableCell></TableRow>
            ) : alerts.length > 0 ? (
              alerts.map((a) => (
                <TableRow key={a._id} className={a.resolved ? 'opacity-50' : ''}>
                  <TableCell>
                     <Badge variant={a.severity === 'Critical' ? 'destructive' : a.severity === 'High' ? 'destructive' : 'secondary'}>
                       {a.severity}
                     </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{a.type}</TableCell>
                  <TableCell>{a.message}</TableCell>
                  <TableCell>{a.vehicleId?.name || '-'}</TableCell>
                  <TableCell>
                    {a.resolved ? (
                      <span className="text-green-600 font-semibold text-xs border border-green-600 px-2 py-1 rounded-full">Resolved</span>
                    ) : (
                      <span className="text-red-600 font-semibold text-xs border border-red-600 px-2 py-1 rounded-full">Active</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!a.resolved && (
                      <Button variant="outline" size="sm" onClick={() => handleResolve(a._id)}>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Resolve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={6} className="text-center py-8">No alerts found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
