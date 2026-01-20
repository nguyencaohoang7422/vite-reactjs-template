import HeaderLayout from "./HeaderLayout/HeaderLayout"
import MainLayout from "./MainLayout/MainLayout"

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <HeaderLayout/>
      <div className="flex flex-col flex-1 p-3 pb-0 gap-3">
        <MainLayout/>
      </div>

    </div>
  )
}

export default PrivateLayout
