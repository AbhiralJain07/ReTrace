"use client";

import { ItemForm } from "@/components/items/ItemForm";
import { ItemType, type Item } from "@/lib/types";

export default function ReportLostPage() {
  // TODO: Replace with actual server action submission
  const handleReportLostItem = (data: Omit<Item, 'id' | 'itemType' | 'dateReported'>, itemType: ItemType) => {
    console.log("Reporting lost item:", { ...data, itemType });
    // Example: await reportLostItemAction({ ...data, itemType });
  };

  return (
    <div className="py-8">
      <ItemForm itemType={ItemType.LOST} onSubmitForm={handleReportLostItem} />
    </div>
  );
}
