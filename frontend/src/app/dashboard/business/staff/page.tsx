import { riderPerformances } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'

const staffMembers = riderPerformances.map((rider, index) => ({
  id: `STF-${index + 101}`,
  name: rider.name,
  role: index === 0 ? 'Operations Lead' : index === 1 ? 'Logistics Coordinator' : 'Customer Success',
  email: `${rider.name.split(' ')[0].toLowerCase()}@bizone.africa`,
  status: index === 2 ? 'Inactive' : 'Active',
  lastLogin: index === 2 ? '2 days ago' : '15 mins ago'
}))

export default function BusinessStaffPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Team & Access</h1>
        <p className="text-sm text-gray-500">Manage who can access Bizone dashboards, permissions, and alerts.</p>
      </header>

      <Card className="border border-gray-200/70 shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg text-gray-900">Team members</CardTitle>
            <CardDescription>Invite teammates and assign roles tailored to your workflows.</CardDescription>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Invite teammate</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-semibold text-gray-900">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="text-sm text-gray-500">{member.email}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'Active' ? 'success' : 'warning'}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{member.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

