import HeaderLayout from "./HeaderLayout"
import MainLayout from "./MainLayout"
import SidebarLayout from "./SidebarLayout"

const PrivateLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#FAFAFB] flex-1">
      <SidebarLayout/>
      <div className="flex flex-col flex-1 p-3 pb-0 gap-3">
        <HeaderLayout/>
        <MainLayout/>
      </div>

    </div>
  )
}

export default PrivateLayout
