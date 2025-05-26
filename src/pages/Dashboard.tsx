
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import HierarchyView from "@/components/dashboard/HierarchyView";
import { Building, Users, FileText, AlertCircle } from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";

const Dashboard = () => {
  const { selectedCompany } = useCompany();
  
  // Mock statistics
  const stats = [
    {
      title: 'Total Companies',
      value: '24',
      change: '+2.5%',
      changeType: 'increase',
      icon: Building
    },
    {
      title: 'Total Directors',
      value: '156',
      change: '+3.2%',
      changeType: 'increase',
      icon: Users
    },
    {
      title: 'Pending Filings',
      value: '12',
      change: '-1.1%',
      changeType: 'decrease',
      icon: FileText
    },
    {
      title: 'Compliance Alerts',
      value: '5',
      change: '-2.3%',
      changeType: 'decrease',
      icon: AlertCircle
    }
  ];

  // Mock recent activities
  const activities = [
    { id: 1, action: 'Company Added', entity: 'ABC Enterprises Pvt Ltd', user: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Director Updated', entity: 'Rajesh Kumar', user: 'Sarah Smith', time: '4 hours ago' },
    { id: 3, action: 'Filing Submitted', entity: 'XYZ Corp Ltd - Annual Return', user: 'Mike Brown', time: '1 day ago' },
    { id: 4, action: 'Company Updated', entity: 'Global Innovations Ltd', user: 'John Doe', time: '2 days ago' },
  ];

  // Mock upcoming deadlines
  const deadlines = [
    { id: 1, task: 'Annual Return Filing', company: 'ABC Enterprises Pvt Ltd', dueDate: 'May 30, 2025' },
    { id: 2, task: 'Board Meeting', company: 'XYZ Corp Ltd', dueDate: 'June 05, 2025' },
    { id: 3, task: 'GST Return', company: 'Global Innovations Ltd', dueDate: 'June 10, 2025' },
    { id: 4, task: 'Director KYC', company: 'All Companies', dueDate: 'June 15, 2025' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {selectedCompany && (
            <div className="text-sm text-muted-foreground">
              Viewing data for: <span className="font-medium">{selectedCompany.name}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="flex items-center p-6">
                <div className="p-2 mr-4 bg-primary/10 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`ml-2 text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Hierarchy Section */}
        <HierarchyView />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.entity}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Compliance deadlines to monitor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-start gap-4">
                    <div className="h-2 w-2 mt-2 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">{deadline.task}</div>
                      <div className="text-sm text-muted-foreground">{deadline.company}</div>
                      <div className="text-xs text-red-500 mt-1">Due: {deadline.dueDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
