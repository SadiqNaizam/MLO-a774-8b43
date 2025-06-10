import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DateRangeSelector from '@/components/DateRangeSelector';
import KPIWidget from '@/components/KPIWidget';
import ActivityFeedItem from '@/components/ActivityFeedItem';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "@/components/ui/chart";
import { DollarSign, ShoppingCart, Users as UsersIcon, Zap, Activity, Package, BarChartBig, Settings as SettingsIcon, LayoutDashboard } from 'lucide-react'; // Renamed Users to UsersIcon
import type { DateRange } from 'react-day-picker';
import type { ChartConfig } from "@/components/ui/chart"; // Assuming this type exists

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/sales-analytics", label: "Sales Analytics", icon: BarChartBig },
  { href: "/product-performance", label: "Product Performance", icon: Package },
  { href: "/customer-insights", label: "Customer Insights", icon: UsersIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop Sales", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile Sales", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const DashboardOverviewPage = () => {
  console.log('DashboardOverviewPage loaded');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    console.log('Dashboard date range changed:', newRange);
    // Add logic to refetch data based on newRange
  };

  const kpis = [
    { title: "Total Revenue", value: "45,231.89", metricUnit: "$", trend: 12.5, trendDescription: "vs. last month", icon: DollarSign },
    { title: "Total Orders", value: "1,890", trend: 8.2, trendDescription: "vs. last month", icon: ShoppingCart },
    { title: "Conversion Rate", value: "2.5%", trend: -0.5, trendDescription: "vs. last month", icon: Zap },
    { title: "Average Order Value", value: "23.96", metricUnit: "$", trend: 1.8, trendDescription: "vs. last month", icon: DollarSign },
  ];

  const recentActivities = [
    { actorName: "Olivia Martin", actorAvatarUrl: "https://i.pravatar.cc/40?u=olivia", actionDescription: "placed Order #12345 for $250.00", timestamp: new Date(Date.now() - 3600000), details: <a href="#" className="text-blue-600 hover:underline">View Order</a> },
    { actorName: "Jackson Lee", actorAvatarUrl: "https://i.pravatar.cc/40?u=jackson", actionDescription: "updated Product 'Quantum Widget'", timestamp: new Date(Date.now() - 7200000 * 2), icon: Package },
    { actionDescription: "System alert: Inventory low for 'Flux Capacitor'", timestamp: new Date(Date.now() - 7200000 * 3), icon: Activity, details: <a href="#" className="text-orange-600 hover:underline">Check Stock</a> },
    { actorName: "Sophia Brown", actorAvatarUrl: "https://i.pravatar.cc/40?u=sophia", actionDescription: "registered a new account.", timestamp: new Date(Date.now() - 7200000 * 4), icon: UsersIcon },
  ];

  const recentSalesData = [
      { id: "ORD001", customer: "Liam Johnson", amount: "$250.00", status: "Fulfilled", date: "2023-10-26" },
      { id: "ORD002", customer: "Olivia Smith", amount: "$150.00", status: "Pending", date: "2023-10-25" },
      { id: "ORD003", customer: "Noah Williams", amount: "$350.00", status: "Fulfilled", date: "2023-10-24" },
      { id: "ORD004", customer: "Emma Brown", amount: "$450.00", status: "Shipped", date: "2023-10-23" },
      { id: "ORD005", customer: "James Jones", amount: "$50.00", status: "Cancelled", date: "2023-10-22" },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={navLinks} className="border-r" />
      <div className="flex flex-col">
        <Header navLinksForMobile={navLinks.map(({icon, ...rest}) => rest)} /> {/* Pass navlinks without icons to Header */}
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            <DateRangeSelector onDateChange={handleDateChange} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpis.map(kpi => <KPIWidget key={kpi.title} {...kpi} />)}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Monthly sales overview (Desktop vs. Mobile)</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                 <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Legend />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                 <CardDescription>Latest updates and notifications.</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[380px] overflow-y-auto pr-2">
                {recentActivities.map((activity, index) => (
                  <ActivityFeedItem key={index} {...activity} className={index < recentActivities.length - 1 ? "border-b" : ""} />
                ))}
              </CardContent>
            </Card>
          </div>
           <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>A quick look at the latest incoming orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentSalesData.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell className="font-medium">{sale.id}</TableCell>
                                    <TableCell>{sale.customer}</TableCell>
                                    <TableCell className="text-right">{sale.amount}</TableCell>
                                    <TableCell>{sale.status}</TableCell>
                                    <TableCell className="text-right">{sale.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
};
export default DashboardOverviewPage;