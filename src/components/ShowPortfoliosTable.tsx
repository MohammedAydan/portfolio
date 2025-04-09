"use client";

import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { RotateCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useGetMyPortfolios } from "@/lib/firebase/hooks";


const ShowPortfoliosTable = ({ userId }: { userId: string }) => {
    const { fetchData, removePortfolio, portfolios, portfoliosLoading } = useGetMyPortfolios(userId);

    return (
        <div className="">
            <Button size={"icon"} variant={"outline"} onClick={fetchData}>
                <RotateCw />
            </Button>
            <Table>
                <TableCaption>My Portfolios</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Show</TableCell>
                        <TableCell className="text-right">Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!portfoliosLoading && portfolios.length > 0 ? (
                        portfolios.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="text-foreground/80">{p.name}</TableCell>
                                <TableCell className="text-foreground/80">{p.createdAt}</TableCell>
                                <TableCell>
                                    <Link href={`/portfolio/${p.id}`} className="text-blue-500 hover:underline">
                                        Show
                                    </Link>
                                </TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button size="icon" variant="destructive" onClick={() => removePortfolio(p.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : portfoliosLoading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                Loading portfolios...
                            </TableCell>
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                No portfolios found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ShowPortfoliosTable;
