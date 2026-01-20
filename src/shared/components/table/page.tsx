import { DataTable } from "./data-table"

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default function DemoPage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable  />
    </div>
  )
}