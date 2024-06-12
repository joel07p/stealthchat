import { leaveGroup } from "@/api/home.requests"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Group } from "@/pages/home-page"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Group>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{
        
        row.getValue("name")
      }</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("users") as number <= 2 ? "Single" : "Multi"}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "rooms",
      header: () => <div className="text-right">Rooms</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("rooms"))
        console.log(row)
  
        return <div className="text-right font-medium">{amount}</div>
      },
    },
    {
      accessorKey: "users",
      header: () => <div className="text-right">Users</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("users"))
  
        return <div className="text-right font-medium">{amount}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const group = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(group.joinCode)}
              >
                Copy Group ID
              </DropdownMenuItem>
              <DropdownMenuItem>Manage Group</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View members</DropdownMenuItem>
              <DropdownMenuItem>
                <p className="text-red-400" onClick={(e) => {e.stopPropagation(); leaveGroup({groupId: group.id})}}>Leave group</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]