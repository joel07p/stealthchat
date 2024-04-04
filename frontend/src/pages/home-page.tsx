"use client"

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import { CreateGroupDialog } from "@/components/dialogs/create-group-dialog"
import { JoinGroupDialog } from "@/components/dialogs/join-group-dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const data: Array<Group> = [
  {
    id: "1",
    name: "Group 1",
    type: "group",
    role: "admin",
    users: 10,
    rooms: 5,
  },
  {
    id: "2",
    name: "Group 2",
    type: "direct",
    role: "user",
    users: 5,
    rooms: 2,
  },
  {
    id: "3",
    name: "Group 3",
    type: "group",
    role: "viewer",
    users: 20,
    rooms: 8,
  },
  {
    id: "4",
    name: "Group 4",
    type: "direct",
    role: "admin",
    users: 8,
    rooms: 3,
  },
  {
    id: "1",
    name: "Group 1",
    type: "group",
    role: "admin",
    users: 10,
    rooms: 5,
  },
  {
    id: "2",
    name: "Group 2",
    type: "direct",
    role: "user",
    users: 5,
    rooms: 2,
  },
  {
    id: "3",
    name: "Group 3",
    type: "group",
    role: "viewer",
    users: 20,
    rooms: 8,
  },
  {
    id: "4",
    name: "Group 4",
    type: "direct",
    role: "admin",
    users: 8,
    rooms: 3,
  },
  {
    id: "1",
    name: "Group 1",
    type: "group",
    role: "admin",
    users: 10,
    rooms: 5,
  },
  {
    id: "2",
    name: "Group 2",
    type: "direct",
    role: "user",
    users: 5,
    rooms: 2,
  },
  {
    id: "3",
    name: "Group 3",
    type: "group",
    role: "viewer",
    users: 20,
    rooms: 8,
  },
  {
    id: "4",
    name: "Group 4",
    type: "direct",
    role: "admin",
    users: 8,
    rooms: 3,
  },
  {
    id: "3",
    name: "Group 3",
    type: "group",
    role: "viewer",
    users: 20,
    rooms: 8,
  },
  {
    id: "4",
    name: "Group 4",
    type: "direct",
    role: "admin",
    users: 8,
    rooms: 3,
  }
]

export type Group = {
  id: string
  name: string
  type: "group" | "direct"
  role: "admin" | "user" | "viewer"
  users: number
  rooms: number
}

const columns: ColumnDef<Group>[] = [
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("type")}</div>
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
              onClick={() => navigator.clipboard.writeText(group.id)}
            >
              Copy Group ID
            </DropdownMenuItem>
            <DropdownMenuItem>Manage Group</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View members</DropdownMenuItem>
            <DropdownMenuItem>
              <p className="text-red-400">Leave group</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function HomePage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="flex justify-center">
      <div className="w-[70%] mt-6">
        <h1 className="text-6xl font-semibold mb-2">Your Groups</h1>
        <Badge variant="outline" className="mb-2">
          <p className="text-green-400">New Release</p>
        </Badge>
        <div className="flex items-center py-4 flex-wrap">
          <Input
            placeholder="Filter groups..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <JoinGroupDialog />
          <Separator orientation="vertical" />
          <CreateGroupDialog />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Account <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Account
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <p>Edit Profile</p>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" defaultValue="New Username"/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Invitations</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <Link to="/group/1/chat/1">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
    </div>
  </div>  
  )
}
