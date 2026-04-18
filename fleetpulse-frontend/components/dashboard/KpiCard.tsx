import { Card, CardContent } from "@/components/ui/card";

export default function KpiCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}