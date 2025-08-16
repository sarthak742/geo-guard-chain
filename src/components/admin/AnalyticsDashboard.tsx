import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const incidentsByLocation = [
  { location: "Times Square", count: 12, fill: "hsl(var(--restricted))" },
  { location: "Central Park", count: 8, fill: "hsl(var(--caution))" },
  { location: "Brooklyn Bridge", count: 5, fill: "hsl(var(--safe))" },
  { location: "High Line", count: 3, fill: "hsl(var(--primary))" },
  { location: "Wall Street", count: 7, fill: "hsl(var(--secondary))" },
];

const incidentsByTime = [
  { hour: "06:00", count: 2 },
  { hour: "09:00", count: 5 },
  { hour: "12:00", count: 8 },
  { hour: "15:00", count: 12 },
  { hour: "18:00", count: 15 },
  { hour: "21:00", count: 9 },
  { hour: "00:00", count: 4 },
];

const incidentsBySeverity = [
  { name: "High", value: 30, fill: "hsl(var(--restricted))" },
  { name: "Medium", value: 45, fill: "hsl(var(--caution))" },
  { name: "Low", value: 25, fill: "hsl(var(--safe))" },
];

const chartConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(var(--primary))",
  },
  count: {
    label: "Count",
    color: "hsl(var(--primary))",
  },
};

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <span className="text-sm bg-safe/20 text-safe px-2 py-1 rounded-full">24h Period</span>
          <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded-full">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incidents by Location */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Incidents by Location</h3>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsByLocation}>
                <XAxis 
                  dataKey="location" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Incidents by Severity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Incidents by Severity</h3>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentsBySeverity}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {incidentsBySeverity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Incidents by Time */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Incidents by Time (24h Pattern)</h3>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentsByTime}>
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </div>

      {/* Insights Summary */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold mb-3 text-primary">AI Insights Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Peak Risk Hours</p>
            <p className="text-xs text-muted-foreground">15:00-21:00 show highest incident rates</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Hotspot Alert</p>
            <p className="text-xs text-muted-foreground">Times Square requires increased patrol</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Trend Analysis</p>
            <p className="text-xs text-muted-foreground">+15% incidents vs last week</p>
          </div>
        </div>
      </Card>
    </div>
  );
};