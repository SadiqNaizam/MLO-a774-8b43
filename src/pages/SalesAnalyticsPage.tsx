import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DateRangeSelector from '@/components/DateRangeSelector';
import KPIWidget from '@/components/KPIWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "@/components/ui/chart";
import { DollarSign, ShoppingCart, TrendingUp, Package, BarChartBig, Users as UsersIcon, Settings as SettingsIcon, LayoutDashboard } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import type { ChartConfig } from "@/components/ui/chart";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/sales-analytics", label: "Sales Analytics", icon: BarChartBig },
  { href: "/product-performance", label: "Product Performance", icon: Package },
  { href: "/customer-insights", label: "Customer Insights", icon: UsersIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

const salesTrendData = [
  { date: "2023-10-01", revenue: 1250, orders: 15 }, { date: "2023-10-02", revenue: 1800, orders: 22 },
  { date: "2023-10-03", revenue: 1600, orders: 19 }, { date: "2023-10-04", revenue: 2100, orders: 25 },
  { date: "2023-10-05", revenue: 1950, orders: 23 }, { date: "2023-10-06", revenue: 2300, orders: 28 },
  { date: "2023-10-07", revenue: 2500, orders: 30 },
];
const salesTrendConfig = {
  revenue: { label: "Revenue ($)", color: "hsl(var(--chart-1))" },
  orders: { label: "Orders", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const salesBreakdownData = [
    { date: "2023-10-20", dailyRevenue: "$1,200.50", orders: 15, avgOrderValue: "$80.03" },
    { date: "2023-10-21", dailyRevenue: "$1,500.75", orders: 22, avgOrderValue: "$68.22" },
    { date: "2023-10-22", dailyRevenue: "$980.00", orders: 12, avgOrderValue: "$81.67" },
    { date: "2023-10-23", dailyRevenue: "$1,850.25", orders: 25, avgOrderValue: "$74.01" },
    { date: "2023-10-24", dailyRevenue: "$2,100.00", orders: 30, avgOrderValue: "$70.00" },
];

const SalesAnalyticsPage = () => {
  console.log('SalesAnalyticsPage loaded');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    console.log('Sales Analytics date range changed:', newRange);
    // Add logic to refetch data
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={navLinks} className="border-r"/>
      <div className="flex flex-col">
        <Header navLinksForMobile={navLinks.map(({icon, ...rest}) => rest)} />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold">Sales Analytics</h1>
            <DateRangeSelector onDateChange={handleDateChange} />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <KPIWidget 
              title="Total Revenue"
              value="25,840.50"
              metricUnit="$"
              trend={5.2}
              trendDescription="vs previous period"
              icon={DollarSign}
            />
            <KPIWidget 
              title="Total Orders"
              value="853"
              trend={7.1}
              trendDescription="vs previous period"
              icon={ShoppingCart}
            />
             <KPIWidget 
              title="Avg. Revenue per Day"
              value="1,230.75"
              metricUnit="$"
              trend={3.9}
              trendDescription="vs previous period"
              icon={TrendingUp}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue & Order Trends</CardTitle>
              <CardDescription>Performance over the selected date range.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
               <ChartContainer config={salesTrendConfig} className="min-h-[350px] w-full">
                <LineChart accessibilityLayer data={salesTrendData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="left" stroke="var(--color-revenue)" tickFormatter={(value) => `$${value/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-orders)" />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2.5} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Breakdown</CardTitle>
              <CardDescription>Detailed view of sales metrics per day.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Daily Revenue</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Average Order Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesBreakdownData.map(row => (
                    <TableRow key={row.date}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell className="text-right">{row.dailyRevenue}</TableCell>
                      <TableCell className="text-right">{row.orders}</TableCell>
                      <TableCell className="text-right">{row.avgOrderValue}</TableCell>
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
export default SalesAnalyticsPage;