"use client";

import { useEffect, useState } from "react";
import { getDrivers, createDriver, updateDriver, deleteDriver } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DEFAULT_DRIVER = {
  name: "", licenseNumber: "", phone: "", status: "Active",
  safetyScore: 100, totalHoursDriven: 0
};

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(DEFAULT_DRIVER);

  const loadDrivers = () => {
    setLoading(true);
    getDrivers()
      .then(setDrivers)
      .catch((err) => toast.error("Failed to load drivers"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(DEFAULT_DRIVER);
    setOpen(true);
  };

  const handleOpenEdit = (driver: any) => {
    setEditingId(driver._id);
    setFormData({
      name: driver.name,
      licenseNumber: driver.licenseNumber,
      phone: driver.phone || "",
      status: driver.status,
      safetyScore: driver.safetyScore ?? 100,
      totalHoursDriven: driver.totalHoursDriven ?? 0,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDriver(editingId, formData);
        toast.success("Driver updated successfully!");
      } else {
        await createDriver(formData);
        toast.success("Driver added successfully!");
      }
      setOpen(false);
      loadDrivers();
    } catch (err: any) {
      toast.error(err.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this driver?")) return;
    try {
      await deleteDriver(id);
      toast.success("Driver deleted successfully");
      loadDrivers();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete driver");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Driver Management</h1>
        <Button onClick={handleOpenCreate}><Plus className="w-4 h-4 mr-2"/> Add Driver</Button>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Driver" : "Register New Driver"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Driver Name</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
            </div>
            <div className="space-y-2">
              <Label>License Number</Label>
              <Input required value={formData.licenseNumber} onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})} placeholder="e.g. XY-12345678" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 234 567 8900" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Off-Duty">Off-Duty</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Safety Score (0-100)</Label>
              <Input type="number" min="0" max="100" value={formData.safetyScore} onChange={(e) => setFormData({...formData, safetyScore: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Total Hours Driven</Label>
              <Input type="number" min="0" value={formData.totalHoursDriven} onChange={(e) => setFormData({...formData, totalHoursDriven: Number(e.target.value)})} />
            </div>
            
            <div className="col-span-2 pt-4 flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="flex-1">{editingId ? "Save Changes" : "Add Driver"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Safety Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading drivers...</TableCell></TableRow>
            ) : drivers.length > 0 ? (
              drivers.map((d) => (
                <TableRow key={d._id}>
                  <TableCell className="font-medium">
                    {d.name}
                    <div className="text-xs text-gray-500 mt-1">{d.phone}</div>
                  </TableCell>
                  <TableCell>{d.licenseNumber}</TableCell>
                  <TableCell>
                    <Badge variant={d.status === 'Active' ? 'default' : 'secondary'}>
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                          <div className={`h-2.5 rounded-full ${d.safetyScore > 80 ? 'bg-green-500' : d.safetyScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${d.safetyScore}%` }}></div>
                       </div>
                       <span className="text-xs font-medium">{d.safetyScore}/100</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(d)}>
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(d._id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={5} className="text-center py-8">No drivers found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
