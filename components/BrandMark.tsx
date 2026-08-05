import Image from "next/image";

export function BrandMark() {
  return (
    <Image
      className="brandMark"
      src="/images/nofi-logo.png"
      alt=""
      width={40}
      height={40}
      priority
    />
  );
}
