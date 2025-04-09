/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useFirestorePagination } from "@/lib/firebase/hooks";
import { Loader2, RefreshCw, Trash2, Edit } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import { adminAuth } from "@/lib/firebase/AdminApp";

interface DocumentData {
    id: string;
    [key: string]: any;
}

interface Column<T extends DocumentData> {
    key: keyof T | string;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
}

interface FirestoreTableProps<T extends DocumentData> {
    collectionName: string;
    columns: Column<T>[];
    docsPerPage?: number;
    orderByField?: string;
    searchField?: string;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    title?: string;
    description?: string;
}

const FirestoreTable = <T extends DocumentData>({
    collectionName,
    columns,
    docsPerPage = 10,
    orderByField = "createdAt",
    searchField = "email",
    onEdit,
    onDelete,
    title = `Manage ${collectionName}`,
    description = `Here you can view, edit, and manage ${collectionName}.`,
}: FirestoreTableProps<T>) => {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const {
        error,
        data,
        initialLoading,
        loading,
        hasNext,
        hasPrev,
        fetchNextPage,
        fetchPrevPage,
        searchData,
        fetchInitialData,
        deleteItem,
    } = useFirestorePagination(collectionName, {
        docsPerPage,
        splitData: false,
        orderByField,
    });

    const handleSearch = useCallback(() => {
        if (search.trim()) {
            searchData(searchField, search.trim());
        }
    }, [search, searchData, searchField]);

    const openEditModal = (item: T) => {
        setSelectedItem(item);
        setEditModalOpen(true);
    };

    const openDeleteModal = (item: T) => {
        setSelectedItem(item);
        setDeleteModalOpen(true);
    };

    const handleEdit = () => {
        if (onEdit && selectedItem) {
            onEdit(selectedItem);
        }
        setEditModalOpen(false);
    };

    const handleDelete = () => {
        if (selectedItem) {
            if (!onDelete) {
                if (collectionName === "users") {
                    fetch("/api/admin/delete-user", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ uid: selectedItem.id }),
                    }).then(async (res) => {
                        console.log(await res.json());
                        if (res.ok) {
                            deleteItem(selectedItem.id);
                        } else {
                            console.error("Failed to delete user");
                        }
                    });
                } else {
                    deleteItem(selectedItem.id);
                }
            } else {
                onDelete(selectedItem);
            }
        }
        setDeleteModalOpen(false);
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4 text-foreground">{title}</h1>
            <p className="text-foreground mb-4">{description}</p>

            {error && !initialLoading && <ErrorMessage error={error} />}
            {!initialLoading && (
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    handleSearch={handleSearch}
                    fetchInitialData={fetchInitialData}
                    loading={loading}
                />
            )}
            {initialLoading ? (
                <LoadingIndicator />
            ) : (
                <DataTable
                    data={data as T[]}
                    columns={columns}
                    hasNext={hasNext}
                    hasPrev={hasPrev}
                    fetchNextPage={fetchNextPage}
                    fetchPrevPage={fetchPrevPage}
                    loading={loading}
                    openEditModal={openEditModal}
                    openDeleteModal={openDeleteModal}
                    showEditButton={onEdit != null}
                />
            )}

            {editModalOpen && (
                <EditModal item={selectedItem} setOpen={setEditModalOpen} onConfirm={handleEdit} />
            )}
            {deleteModalOpen && (
                <DeleteModal item={selectedItem} setOpen={setDeleteModalOpen} onConfirm={handleDelete} />
            )}
        </div>
    );
};

const DataTable = <T extends DocumentData>({
    data,
    columns,
    hasNext,
    hasPrev,
    fetchNextPage,
    fetchPrevPage,
    loading,
    openEditModal,
    openDeleteModal,
    showEditButton,
}: {
    data: T[];
    columns: Column<T>[];
    hasNext: boolean;
    hasPrev: boolean;
    fetchNextPage: () => void;
    fetchPrevPage: () => void;
    loading: boolean;
    openEditModal: (item: T) => void;
    openDeleteModal: (item: T) => void;
    showEditButton: boolean;
}) => (
    <>
        <Table>
            <TableCaption>{data.length > 0 ? "A list of recent items." : "No items found."}</TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map((col) => (
                        <TableHead key={col.key as string}>{col.label}</TableHead>
                    ))}
                    {showEditButton && (
                        <TableHead>Edit</TableHead>
                    )}
                    <TableHead>Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {columns.map((col) => (
                            <TableCell
                                key={col.key as string}
                                className={`p-4`}
                            >
                                {col.render ? col.render(item[col.key], item) : (item[col.key]?.toString()) || "N/A"}
                            </TableCell>
                        ))}
                        {showEditButton && (
                            <TableCell>
                                <Button size={"icon"} variant="outline" onClick={() => openEditModal(item)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        )}
                        <TableCell>
                            <Button size={"icon"} variant="destructive" onClick={() => openDeleteModal(item)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <div className="flex gap-2 mt-4 justify-center">
            {/* <Button disabled={!hasPrev || loading} onClick={fetchPrevPage} variant="outline">
                Previous {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button> */}
            <Button disabled={!hasNext || loading} onClick={fetchNextPage} variant="outline">
                Load More {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
        </div>
    </>
);


const SearchBar = ({
    search,
    setSearch,
    handleSearch,
    fetchInitialData,
    loading,
}: {
    search: string;
    setSearch: (value: string) => void;
    handleSearch: () => void;
    fetchInitialData: () => void;
    loading: boolean;
}) => (
    <div className="flex gap-2 w-full max-w-80 my-5">
        <Button onClick={fetchInitialData} variant="outline" size="icon" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
        <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
        />
        <Button disabled={!search.trim() || loading} onClick={handleSearch}>
            Search
        </Button>
    </div>
);

const LoadingIndicator = () => (
    <div className="w-full p-5 flex items-center justify-center">
        <Loader2 className="w-11 h-11 animate-spin" />
    </div>
);

const EditModal = <T extends DocumentData>({
    item,
    setOpen,
    onConfirm,
}: {
    item: T | null;
    setOpen: (val: boolean) => void;
    onConfirm: () => void;
}) => (
    <Dialog open={true} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>Edit Item: {item?.id}</DialogHeader>
            <p>Implement your edit form here for {item?.id}</p>
            <DialogFooter>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={onConfirm}>Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const DeleteModal = <T extends DocumentData>({
    item,
    setOpen,
    onConfirm,
}: {
    item: T | null;
    setOpen: (val: boolean) => void;
    onConfirm: () => void;
}) => (
    <Dialog open={true} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>Are you sure you want to delete {item?.id}?</DialogHeader>
            <DialogFooter>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={onConfirm}>
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default FirestoreTable;