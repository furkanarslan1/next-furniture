import React, { Suspense } from "react";
import AddHeroForm from "./_components/AddHeroForm";

export default function HeroAddPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading form...</div>}>
        <AddHeroForm />
      </Suspense>
    </div>
  );
}
