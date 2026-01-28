import React, { Suspense } from "react";
import ToastHandler from "./add/_components/ToastHandler";

export default function FurniturePage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>
      <h1 className="text-3xl font-bold">Product Management</h1>
    </div>
  );
}
