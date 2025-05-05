import Image from "next/image"

interface ProductImageProps {
  src?: string
  alt: string
}

export function ProductImage({ src, alt }: ProductImageProps) {
  if (src) {
    return (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, 
                 (max-width: 768px) 50vw, 
                 (max-width: 1024px) 33vw, 
                 25vw"
          unoptimized
        />
    )
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <span className="text-muted-foreground">No image</span>
    </div>
  )
}