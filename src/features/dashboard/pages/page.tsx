import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared"
import { WrenchIcon } from "@phosphor-icons/react"

const Dashboard = () => {
  return (
    <div>
        <Tooltip>
      <TooltipTrigger   asChild>
         <Button variant={'outline'} size={"icon-sm"}>
          <WrenchIcon/>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right"> 
        <p>Add to library</p>
      </TooltipContent>
        </Tooltip>
      </div>
  )
}

export default Dashboard
