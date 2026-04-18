"use client";

import { useEffect, useState } from "react";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle, getDrivers } from "@/lib/api";
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

const DEFAULT_VEHICLE = {
  name: "", registrationNumber: "", status: "Active",
  model: "", year: new Date().getFullYear(),
  fuelLevel: 100, fuelEfficiency: 0,
  batteryHealth: 100, tireCondition: "Good",
  assignedDriver: "" // id
};

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(DEFAULT_VEHICLE);

  const loadData = () => {
    setLoading(true);
    // Load both vehicles and drivers (for the assignment dropdown)
    Promise.all([getVehicles(), getDrivers()])
      .then(([vRes, dRes]) => {
        setVehicles(vRes);
        setDrivers(dRes);
      })
      .catch((err) => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(DEFAULT_VEHICLE);
    setOpen(true);
  };

  const handleOpenEdit = (vehicle: any) => {
    setEditingId(vehicle._id);
    setFormData({
      name: vehicle.name,
      registrationNumber: vehicle.registrationNumber,
      status: vehicle.status,
      model: vehicle.model || "",
      year: vehicle.year || new Date().getFullYear(),
      fuelLevel: vehicle.fuelLevel ?? 100,
      fuelEfficiency: vehicle.fuelEfficiency ?? 0,
      batteryHealth: vehicle.batteryHealth ?? 100,
      tireCondition: vehicle.tireCondition || "Good",
      assignedDriver: vehicle.assignedDriver?._id || vehicle.assignedDriver || "none",
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.assignedDriver || payload.assignedDriver === "none") {
         delete payload.assignedDriver; // dont map empty strings to ObjectIds
      }

      if (editingId) {
        await updateVehicle(editingId, payload);
        toast.success("Vehicle updated successfully!");
      } else {
        await createVehicle(payload);
        toast.success("Vehicle created successfully!");
      }
      setOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await deleteVehicle(id);
      toast.success("Vehicle deleted successfully");
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete vehicle");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Fleet Management</h1>
        <Button onClick={handleOpenCreate}><Plus className="w-4 h-4 mr-2"/> Add Vehicle</Button>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Vehicle" : "Register New Vehicle"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vehicle Name</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Truck 104" />
            </div>
            <div className="space-y-2">
              <Label>Registration Number</Label>
              <Input required value={formData.registrationNumber} onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})} placeholder="e.g. KA-01-XX-9999" />
            </div>
            <div className="space-y-2">
              <Label>Vehicle Model</Label>
              <Input value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} placeholder="e.g. Volvo FH16" />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: Number(e.target.value)})} placeholder="2024" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fuel Efficiency (km/l)</Label>
              <Input type="number" step="0.1" value={formData.fuelEfficiency} onChange={(e) => setFormData({...formData, fuelEfficiency: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Fuel Level (%)</Label>
              <Input type="number" min="0" max="100" value={formData.fuelLevel} onChange={(e) => setFormData({...formData, fuelLevel: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Battery Health (%)</Label>
              <Input type="number" min="0" max="100" value={formData.batteryHealth} onChange={(e) => setFormData({...formData, batteryHealth: Number(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Tire Condition</Label>
              <Select value={formData.tireCondition} onValueChange={(val) => setFormData({...formData, tireCondition: val})}>
                <SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Assigned Driver</Label>
              <Select value={formData.assignedDriver} onValueChange={(val) => setFormData({...formData, assignedDriver: val})}>
                <SelectTrigger><SelectValue placeholder="Assign a driver" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {drivers.map(d => (
                    <SelectItem key={d._id} value={d._id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2 pt-4 flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" className="flex-1">{editingId ? "Save Changes" : "Create Vehicle"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Reg Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading vehicles...</TableCell></TableRow>
            ) : vehicles.length > 0 ? (
              vehicles.map((v) => (
                <TableRow key={v._id}>
                  <TableCell className="font-medium">
                     {v.name}
                     <div className="text-xs text-gray-500 mt-1">{v.model} ({v.year})</div>
                  </TableCell>
                  <TableCell>{v.registrationNumber}</TableCell>
                  <TableCell>
                    <Badge variant={v.status === 'Active' ? 'default' : v.status === 'Maintenance' ? 'destructive' : 'secondary'}>
                      {v.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{v.assignedDriver?.name || 'Unassigned'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(v)}>
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(v._id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={5} className="text-center py-8">No vehicles found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
