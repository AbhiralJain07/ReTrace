"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ItemCategory, ItemType } from "@/lib/types";
import { ITEM_CATEGORIES } from "@/lib/constants";
import { UploadCloud, DollarSign } from "lucide-react";
import React from "react";

const itemFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(1000),
  category: z.nativeEnum(ItemCategory, { errorMap: () => ({ message: "Please select a category."}) }),
  location: z.string().optional(),
  imageUrl: z.string().optional(), // For simplicity, we'll use a text input for URL. Real app would use file upload.
  contactInfo: z.string().optional(),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)), // Convert empty string to undefined for optional number
    z.number().positive({ message: "Price must be a positive number." }).optional()
  ),
});

type ItemFormValues = z.infer<typeof itemFormSchema>;

interface ItemFormProps {
  itemType: ItemType; // To determine context (Lost, Found, Exchange)
  onSubmitForm: (data: ItemFormValues, itemType: ItemType) => void; // Actual submission logic
}

export function ItemForm({ itemType, onSubmitForm }: ItemFormProps) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      description: "",
      // category: undefined, // Will be handled by Select placeholder
      location: "",
      imageUrl: "",
      contactInfo: "",
      price: undefined,
    },
  });

  function handleSubmit(data: ItemFormValues) {
    console.log(`Submitting ${itemType} item:`, data);
    onSubmitForm(data, itemType); // Pass to parent for actual handling
    toast({
      title: `${itemType} Item Reported (Mock)`,
      description: "Your item details have been recorded.",
    });
    form.reset();
    setImagePreview(null);
  }
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // In a real app, you'd upload this file and set form.setValue('imageUrl', uploadedUrl)
        form.setValue('imageUrl', reader.result as string); // For demo, using data URL
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      form.setValue('imageUrl', '');
    }
  };


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary">
          {itemType === ItemType.LOST && "Report a Lost Item"}
          {itemType === ItemType.FOUND && "Announce a Found Item"}
          {itemType === ItemType.EXCHANGE && "List an Item for Exchange"}
        </CardTitle>
        <CardDescription className="text-center">
          Please provide as much detail as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name / Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Black Leather Wallet, iPhone 13 Pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details like brand, color, size, distinguishing features, where it was lost/found, etc."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ITEM_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>
              </FormControl>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="max-h-48 rounded-md mx-auto" />
                </div>
              )}
              <FormMessage />
            </FormItem>


            {itemType !== ItemType.EXCHANGE && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Known Location / Found Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Central Park near the fountain, Main St. Bus Stop" {...field} />
                    </FormControl>
                    <FormDescription>
                      Be as specific as possible.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {itemType === ItemType.EXCHANGE && (
              <>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="number" placeholder="Enter price (e.g., 25.00) or leave blank for free/donation" {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter 0 or leave blank if the item is free or for donation.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Information (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., your_email@example.com or phone number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How interested parties can reach you. This will be public if provided.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}


            <Button type="submit" className="w-full text-lg py-3 mt-8">
              {itemType === ItemType.LOST && "Submit Lost Item Report"}
              {itemType === ItemType.FOUND && "Submit Found Item Announcement"}
              {itemType === ItemType.EXCHANGE && "List Item for Exchange"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
