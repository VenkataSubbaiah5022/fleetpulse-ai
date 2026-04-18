"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", Venkata: 4 },
  { name: "Tue", Venkata: 6 },
  { name: "Wed", Venkata: 2 },
  { name: "Thu", Venkata: 8 },
  { name: "Fri", Venkata: 5 },
];

export default function DriverChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Venkata" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}