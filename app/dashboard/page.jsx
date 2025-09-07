import { checkUser } from "../../lib/checkUser"


export default async function DashboardPage() {
  await checkUser()
  return(
    <div>
      <p className="py-32 text-2xl text-orange-500">Welcome to Dashboard</p>
    </div>
  )
}