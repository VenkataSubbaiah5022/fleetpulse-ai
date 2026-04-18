"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", fuel: 30 },
  { name: "Tue", fuel: 45 },
  { name: "Wed", fuel: 28 },
  { name: "Thu", fuel: 50 },
  { name: "Fri", fuel: 40 },
];

export default function FuelChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="fuel" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}