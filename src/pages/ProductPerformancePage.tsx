import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DateRangeSelector from '@/components/DateRangeSelector';
import KPIWidget from '@/components/KPIWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, PieChart, Pie, Cell, Legend } from "@/components/ui/chart";
import { Package, BarChartBig, Users as UsersIcon, Settings as SettingsIcon, LayoutDashboard, ShoppingBag, TrendingUp, ListFilter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import type { DateRange } from 'react-day-picker';
import type { ChartConfig } from "@/components/ui/chart";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/sales-analytics", label: "Sales Analytics", icon: BarChartBig },
  { href: "/product-performance", label: "Product Performance", icon: Package },
  { href: "/customer-insights", label: "Customer Insights", icon: UsersIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

const productPerformanceData = [
  { id: "PROD001", name: "Super Advanced Widget", category: "Widgets", unitsSold: 150, revenue: "$7,500", stock: 280, conversionRate: "12.5%" },
  { id: "PROD002", name: "Basic Gizmo", category: "Gizmos", unitsSold: 320, revenue: "$3,200", stock: 120, conversionRate: "8.2%" },
  { id: "PROD003", name: "Ultimate Gadget", category: "Gadgets", unitsSold: 95, revenue: "$9,500", stock: 50, conversionRate: "15.1%" },
  { id: "PROD004", name: "Standard Thingamajig", category: "Thingamajigs", unitsSold: 210, revenue: "$4,200", stock: 400, conversionRate: "9.0%" },
  { id: "PROD005", name: "Eco-Friendly Doodad", category: "Doodads", unitsSold: 180, revenue: "$2,700", stock: 0, conversionRate: "7.5%" },
];

const productCategoryChartData = [
  { name: 'Widgets', value: 7500, fill: 'hsl(var(--chart-1))' },
  { name: 'Gizmos', value: 3200, fill: 'hsl(var(--chart-2))' },
  { name: 'Gadgets', value: 9500, fill: 'hsl(var(--chart-3))' },
  { name: 'Thingamajigs', value: 4200, fill: 'hsl(var(--chart-4))' },
  { name: 'Doodads', value: 2700, fill: 'hsl(var(--chart-5))' },
];
const productCategoryChartConfig = {
  Widgets: { label: "Widgets", color: "hsl(var(--chart-1))" },
  Gizmos: { label: "Gizmos", color: "hsl(var(--chart-2))" },
  Gadgets: { label: "Gadgets", color: "hsl(var(--chart-3))" },
  Thingamajigs: { label: "Thingamajigs", color: "hsl(var(--chart-4))" },
  Doodads: { label: "Doodads", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;


const ProductPerformancePage = () => {
  console.log('ProductPerformancePage loaded');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    console.log('Product Performance date range changed:', newRange);
    // Add logic to refetch data
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={navLinks} className="border-r" />
      <div className="flex flex-col">
        <Header navLinksForMobile={navLinks.map(({icon, ...rest}) => rest)} />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold">Product Performance</h1>
            <DateRangeSelector onDateChange={handleDateChange} />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <KPIWidget title="Total Units Sold" value="955" icon={ShoppingBag} trend={8.5} trendDescription="vs last period" />
            <KPIWidget title="Best Performing Product" value="Ultimate Gadget" icon={TrendingUp} trendDescription="by revenue" />
            <KPIWidget title="Out of Stock Products" value="1" icon={Package} trend="neutral" trendDescription="needs reordering" />
          </div>
            
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Product Sales Details</CardTitle>
                    <CardDescription>Overview of product sales, stock, and conversion.</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span>Filter</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>Category</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Stock Level</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Conversion Rate</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Conversion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPerformanceData.map(product => (
                    <TableRow key={product.id} className={product.stock === 0 ? "bg-red-50 dark:bg-red-900/30" : ""}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.unitsSold}</TableCell>
                      <TableCell className="text-right">{product.revenue}</TableCell>
                      <TableCell className="text-right">{product.stock === 0 ? 'Out of Stock' : product.stock}</TableCell>
                      <TableCell className="text-right">{product.conversionRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Product Category</CardTitle>
              <CardDescription>Distribution of revenue across different product categories.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center pt-4">
              <ChartContainer config={productCategoryChartConfig} className="min-h-[300px] w-full max-w-md">
                <PieChart accessibilityLayer>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie data={productCategoryChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                    {productCategoryChartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};
export default ProductPerformancePage;