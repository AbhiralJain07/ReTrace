"use client";

import { ItemForm } from "@/components/items/ItemForm";
import { ItemType, type Item } from "@/lib/types";

export default function AnnounceFoundPage() {
  // TODO: Replace with actual server action submission
  const handleAnnounceFoundItem = (data: Omit<Item, 'id' | 'itemType' | 'dateReported'>, itemType: ItemType) => {
    console.log("Announcing found item:", { ...data, itemType });
    // Example: await announceFoundItemAction({ ...data, itemType });
  };

  return (
    <div className="py-8">
      <ItemForm itemType={ItemType.FOUND} onSubmitForm={handleAnnounceFoundItem} />
    </div>
  );
}
