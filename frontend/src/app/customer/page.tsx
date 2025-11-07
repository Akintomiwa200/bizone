import CustomerProfile from '@/components/customers/CustomerProfile'
import CustomerList from '@/components/customers/CustomerList'
import CommunicationHistory from '@/components/customers/CommunicationHistory'

export default function CustomerPortalPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Customer Portal</h1>
        <p className="text-sm text-gray-500">View your recent purchases, support conversations, and loyalty progress.</p>
      </header>

      <CustomerProfile />
      <CustomerList />
      <CommunicationHistory />
    </div>
  )
}
const Dashboard =()=>{
	return(

		<>

		</>
		)
}


export default Dashboard