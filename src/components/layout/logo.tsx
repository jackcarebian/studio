import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image 
        src="https://i.imgur.com/1tPYul1.png" 
        alt="Logo JasaWebsiteKu" 
        width={32} 
        height={32} 
        className="h-8 w-8 object-contain"
      />
      <span className="font-headline text-xl font-bold text-foreground">
        JasaWebsiteKu
      </span>
    </div>
  );
}
