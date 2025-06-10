import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea for bio
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added Select for theme
import { Package, BarChartBig, Users as UsersIcon, Settings as SettingsIconLucide, LayoutDashboard, UserCircle, Bell, DatabaseZap, Palette, ShieldCheck } from 'lucide-react';

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/sales-analytics", label: "Sales Analytics", icon: BarChartBig },
  { href: "/product-performance", label: "Product Performance", icon: Package },
  { href: "/customer-insights", label: "Customer Insights", icon: UsersIcon },
  { href: "/settings", label: "Settings", icon: SettingsIconLucide },
];

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  // Placeholder submit handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, section: string) => {
    event.preventDefault();
    console.log(`Saving ${section} settings...`, Object.fromEntries(new FormData(event.currentTarget)));
    // Here you would typically call an API to save settings
    // For now, we just log it.
  };


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={navLinks} className="border-r" />
      <div className="flex flex-col">
        <Header navLinksForMobile={navLinks.map(({icon, ...rest}) => rest)} />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8">
          <header>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and application preferences.</p>
          </header>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-w-xl">
              <TabsTrigger value="profile"><UserCircle className="mr-1.5 h-4 w-4 sm:mr-2" />Profile</TabsTrigger>
              <TabsTrigger value="notifications"><Bell className="mr-1.5 h-4 w-4 sm:mr-2" />Notifications</TabsTrigger>
              <TabsTrigger value="appearance"><Palette className="mr-1.5 h-4 w-4 sm:mr-2" />Appearance</TabsTrigger>
              <TabsTrigger value="integrations"><DatabaseZap className="mr-1.5 h-4 w-4 sm:mr-2" />Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <form onSubmit={(e) => handleSubmit(e, "Profile")}>
                <Card>
                  <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>Update your personal information and password.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" name="fullName" defaultValue="Johnathan Doe" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" placeholder="Tell us a little about yourself" defaultValue="E-commerce enthusiast and data-driven decision maker." />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" name="currentPassword" type="password" placeholder="Enter current password"/>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" name="newPassword" type="password" placeholder="Enter new password" />
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Profile</Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
             <form onSubmit={(e) => handleSubmit(e, "Notification")}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified about important events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="emailNotifications" className="font-medium text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates and alerts via email.</p>
                    </div>
                    <Switch id="emailNotifications" name="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                     <div>
                        <Label htmlFor="weeklyReports" className="font-medium text-base">Weekly Summary Reports</Label>
                        <p className="text-sm text-muted-foreground">Get a summary of your dashboard activity every week.</p>
                     </div>
                    <Switch id="weeklyReports" name="weeklyReports" />
                  </div>
                   <div className="flex items-center justify-between rounded-lg border p-4">
                     <div>
                        <Label htmlFor="inAppNotifications" className="font-medium text-base">In-App Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notifications directly within the dashboard.</p>
                     </div>
                    <Switch id="inAppNotifications" name="inAppNotifications" defaultChecked />
                  </div>
                </CardContent>
                 <CardFooter>
                  <Button type="submit">Save Preferences</Button>
                </CardFooter>
              </Card>
              </form>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6">
             <form onSubmit={(e) => handleSubmit(e, "Appearance")}>
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-1.5">
                        <Label htmlFor="theme">Theme</Label>
                        <Select name="theme" defaultValue="system">
                            <SelectTrigger id="theme" className="w-full sm:w-[280px]">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System Default</SelectItem>
                            </SelectContent>
                        </Select>
                         <p className="text-sm text-muted-foreground">Choose your preferred color scheme.</p>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="compactMode" className="font-medium text-base">Compact Mode</Label>
                            <p className="text-sm text-muted-foreground">Reduce padding and margins for a more condensed view.</p>
                        </div>
                        <Switch id="compactMode" name="compactMode" />
                    </div>
                </CardContent>
                 <CardFooter>
                  <Button type="submit">Save Appearance</Button>
                </CardFooter>
              </Card>
              </form>
            </TabsContent>

            <TabsContent value="integrations" className="mt-6">
             <form onSubmit={(e) => handleSubmit(e, "Integrations")}>
              <Card>
                <CardHeader>
                  <CardTitle>Data Integrations</CardTitle>
                  <CardDescription>Manage connections to your data sources and third-party services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="apiKey" className="flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-green-600"/>Active API Key</Label>
                    <Input id="apiKey" name="apiKey" defaultValue="ak_live_************************xyz" readOnly />
                    <p className="text-sm text-muted-foreground">This key is used to securely connect to your primary data source.</p>
                  </div>
                   <div className="rounded-lg border p-4">
                        <h4 className="font-medium text-base mb-1">Google Analytics</h4>
                        <p className="text-sm text-muted-foreground mb-3">Connect your Google Analytics account for enhanced reporting.</p>
                        <Button variant="outline" type="button">Connect Google Analytics</Button>
                    </div>
                </CardContent>
                 <CardFooter className="flex justify-between">
                  <Button type="submit">Save Integration Settings</Button>
                  <Button variant="destructive" type="button">Revoke API Key</Button>
                </CardFooter>
              </Card>
              </form>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};
export default SettingsPage;