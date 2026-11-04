import { useState } from "react"

type ImageWithFallbackProps = {
  src: string
  alt: string
  className: string
  loading?: "lazy" | "eager"
}

// Image URLs are typed in by users, so they can break (404, hotlink protection...).
// The placeholder keeps the same className, so it takes the same size in the layout.
export default function ImageWithFallback({ src, alt, className, loading }: ImageWithFallbackProps) {
  // Remember which src failed: a new src gets a fresh attempt
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <div className={`${className} image-fallback`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
        <span aria-hidden="true">No image</span>
      </div>
    )
  }

  return <img className={className} src={src} alt={alt} loading={loading} onError={() => setFailedSrc(src)} />
}
