import { Bot, ChevronDown, ShoppingBag, Store, Wrench } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

const menuItems = [
  {
    title: "Sales report",
    url: "/",
    icon: ShoppingBag
  },
  {
    title: "Inventory report",
    url: "/inventory",
    icon: Store
  },
]

const menuItemsMining = [
  {
    title: "Disease prediction",
    url: "/disease-prediction",
    icon: Bot
  },
  {
    title: "Train model",
    url: "/train-model",
    icon: Wrench  
  }
]

function AppSidebar() {
  const location = useLocation();
  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-center pb-4">
          <span className="text-3xl font-bold text-[var(--color-main-blue)]">Team 3</span>
        </SidebarHeader>
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Data Warehouse
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-2">
                    {
                      menuItems.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton
                            asChild
                            isActive={location.pathname === item.url}
                            className="py-5"
                          >
                            <Link to={item.url}>
                              <item.icon className="!w-6 !h-6 shrink-0" />
                              <span className="text-base font-base">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    }
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          {/* <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Data Mining
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-2">
                    {
                      menuItemsMining.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton
                            asChild
                            isActive={location.pathname === item.url}
                            className="py-5"
                          >
                            <Link to={item.url}>
                              <item.icon className="!w-6 !h-6 shrink-0" />
                              <span className="text-base font-base">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    }
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible> */}
        </SidebarContent>
      </Sidebar>
    </>
  )
}

export default AppSidebar;
