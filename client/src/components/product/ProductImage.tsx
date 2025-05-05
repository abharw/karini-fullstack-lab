"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Item, validateImageUrl } from "@/types/Item"

interface ProductImageProps {
  item?: Partial<Item>
  alt?: string
  src?: string
}

export function ProductImage({ item, alt, src }: ProductImageProps) {
  const [validImage, setValidImage] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const imageSrc = src || (item?.image_src || '');
  
  useEffect(() => {    

    const checkImage = async () => {
      try {
        const isValid = await validateImageUrl(imageSrc);
        setValidImage(isValid);
      } catch (error) {
        setValidImage(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkImage();
  }, [imageSrc]);
  
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted animate-pulse">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }
  

  if (validImage && imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={alt || item?.title || "Product"}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 640px) 100vw, 
               (max-width: 768px) 50vw, 
               (max-width: 1024px) 33vw, 
               25vw"
        unoptimized
      />
    );
  }
  
  return (
    <Image
      src="/coming-soon.png"
      alt={alt || item?.title || "Product"}
      fill
      style={{ objectFit: "cover" }}
      sizes="(max-width: 640px) 100vw, 
             (max-width: 768px) 50vw, 
             (max-width: 1024px) 33vw, 
             25vw"
      unoptimized
    />
  );
}