/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
export const ErrorMessage = ({ error }: { error: string; }) => (
    <div className="w-full my-2 py-2 px-4 text-white rounded-2xl bg-red-600">{error}</div>
);
