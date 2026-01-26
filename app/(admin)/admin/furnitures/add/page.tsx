import React, { Suspense } from "react";
import FurnitureAddForm from "./_components/FurnitureAddForm";

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto">
      <Suspense
        fallback={<div className="p-4 bg-slate-50">Loading filters...</div>}
      >
        <FurnitureAddForm />
      </Suspense>
    </div>
  );
}
