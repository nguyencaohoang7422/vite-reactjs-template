import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <main id="main-layout" className="flex-1 p-8">
        <Outlet />
    </main>
  )
}

export default MainLayout
