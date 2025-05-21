"use client";

import { ItemForm } from "@/components/items/ItemForm";
import { ItemType, type Item } from "@/lib/types";

export default function ListExchangePage() {
  // TODO: Replace with actual server action submission
  const handleListExchangeItem = (data: Omit<Item, 'id' | 'itemType' | 'dateReported'>, itemType: ItemType) => {
    console.log("Listing exchange item:", { ...data, itemType });
    // Example: await listExchangeItemAction({ ...data, itemType });
  };

  return (
    <div className="py-8">
      <ItemForm itemType={ItemType.EXCHANGE} onSubmitForm={handleListExchangeItem} />
    </div>
  );
}
