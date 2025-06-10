import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DateRangeSelector from '@/components/DateRangeSelector';
import KPIWidget from '@/components/KPIWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "@/components/ui/chart";
import { Package, BarChartBig, Users as UsersIcon, Settings as SettingsIcon, LayoutDashboard, UserPlus, Repeat, DollarSign, UsersRound } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import type { ChartConfig } from "@/components/ui/chart";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/sales-analytics", label: "Sales Analytics", icon: BarChartBig },
  { href: "/product-performance", label: "Product Performance", icon: Package },
  { href: "/customer-insights", label: "Customer Insights", icon: UsersIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

const customerSegmentData = [
  { period: "Jan", newCustomers: 65, returningCustomers: 35 }, { period: "Feb", newCustomers: 70, returningCustomers: 40 },
  { period: "Mar", newCustomers: 80, returningCustomers: 45 }, { period: "Apr", newCustomers: 75, returningCustomers: 50 },
  { period: "May", newCustomers: 90, returningCustomers: 55 }, { period: "Jun", newCustomers: 85, returningCustomers: 60 },
];
const customerSegmentConfig = {
  newCustomers: { label: "New Customers", color: "hsl(var(--chart-1))" },
  returningCustomers: { label: "Returning Customers", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const customerListData = [
    { customerId: "CUST001", name: "Alice Wonderland", email: "alice@example.com", segment: "High Value", totalSpent: "$2,300", lastPurchaseDate: "2023-10-15" },
    { customerId: "CUST002", name: "Bob The Builder", email: "bob@example.com", segment: "Frequent Buyer", totalSpent: "$1,150", lastPurchaseDate: "2023-10-22" },
    { customerId: "CUST003", name: "Charlie Chaplin", email: "charlie@example.com", segment: "New Customer", totalSpent: "$80", lastPurchaseDate: "2023-10-28" },
    { customerId: "CUST004", name: "Diana Prince", email: "diana@example.com", segment: "At Risk", totalSpent: "$550", lastPurchaseDate: "2023-07-01" },
    { customerId: "CUST005", name: "Edward Scissorhands", email: "edward@example.com", segment: "Loyal", totalSpent: "$3,500", lastPurchaseDate: "2023-10-25" },
];

const CustomerInsightsPage = () => {
  console.log('CustomerInsightsPage loaded');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    console.log('Customer Insights date range changed:', newRange);
    // Add logic to refetch data
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={navLinks} className="border-r" />
      <div className="flex flex-col">
        <Header navLinksForMobile={navLinks.map(({icon, ...rest}) => rest)} />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold">Customer Insights</h1>
            <DateRangeSelector onDateChange={handleDateChange} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KPIWidget title="Total Customers" value="1,250" icon={UsersRound} trend={50} trendDescription="new this month" />
            <KPIWidget title="New Customers" value="350" icon={UserPlus} trend={15.2} trendDescription="vs last period" />
            <KPIWidget title="Returning Customer Rate" value="65%" icon={Repeat} trend={-2.5} trendDescription="vs last period" />
            <KPIWidget title="Avg. Customer Lifetime Value (CLV)" value="1,280" metricUnit="$" icon={DollarSign} trend={7.0} trendDescription="overall growth" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>New vs. Returning Customers</CardTitle>
              <CardDescription>Trend of customer acquisition and retention over time.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={customerSegmentConfig} className="min-h-[300px] w-full">
                <BarChart accessibilityLayer data={customerSegmentData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="period" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Legend />
                  <Bar dataKey="newCustomers" fill="var(--color-newCustomers)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="returningCustomers" fill="var(--color-returningCustomers)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer List & Segments</CardTitle>
              <CardDescription>Detailed information about individual customers and their segments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="text-right">Last Purchase</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerListData.map(customer => (
                    <TableRow key={customer.customerId}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.segment}</TableCell>
                      <TableCell className="text-right">{customer.totalSpent}</TableCell>
                      <TableCell className="text-right">{customer.lastPurchaseDate}</TableCell>
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
export default CustomerInsightsPage;