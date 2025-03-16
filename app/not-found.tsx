"use client";

import { Button } from "components/ui/button";
import { siteConfig } from "config/siteConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Image
        src="/logo.svg"
        width={150}
        height={48}
        alt={`${siteConfig.name} logo`}
        priority={true}
      />
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button
          variant="outline"
          className="icon-hover ml-2 mt-4"
          onClick={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
