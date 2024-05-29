"use client"

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import * as React from "react"

import { logout } from "@/api/auth.requests"
import { createGroup, getGroups, joinGroup } from "@/api/home.requests"
import { AccountSheet } from "@/components/dialogs/account-sheet"
import { CreateGroupDialog } from "@/components/dialogs/create-group-dialog"
import { JoinGroupDialog } from "@/components/dialogs/join-group-dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { columns } from "@/utils/helpers/group-columns"
import { CreateGroupData, JoinGroupData } from "@/utils/types/group.types"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export type Group = {
  id: string
  name: string
  type: "group" | "direct"
  role: "admin" | "user" | "viewer"
  users: number
  rooms: number
}

export const HomePage = () =>  {
  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [groups, setGroups] = React.useState<Array<Group>>([])

  const table = useReactTable({
    data: groups,
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

  React.useEffect(() => {
    fetchGroups()
  }, [])

  const handleLogout = () => {
    logout(navigate)
  }

  const fetchGroups = async () => {
    try {
      const groups = await getGroups()
      if(groups) setGroups(groups)
        console.log(groups)
    } catch (error) {
      console.error("Error fetching groups:", error)
    }
  }

  const handleCreateGroup = async (createGroupData: CreateGroupData) => {
    const group = await createGroup(createGroupData)

    if(group) {
      setGroups([...groups, group])
      toast.success("Group created")
    }
  }

  const handleJoinGroup = async (joinGroupData: JoinGroupData) => {
    const group = await joinGroup(joinGroupData)
    
    if(group) {
      setGroups([...groups, group])
      toast.success("Group joined") 
    }
  }

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

          <JoinGroupDialog onJoinGroup={(joinCode: string) => handleJoinGroup({ joinCode })}/>
          <Separator orientation="vertical" />
          <CreateGroupDialog onCreateGroup={(name, description, users) => handleCreateGroup({name, description, users})}/>
          <AccountSheet onLogout={handleLogout}/>
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
                    onClick={() => navigate(`group/${row.original.id}/room/${undefined}`)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
