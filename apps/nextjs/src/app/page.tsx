import Image from "next/image";
import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import infSvg from "../../public/inf-logo-large.svg";

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="h-screen">
        <div className="flex w-full flex-col gap-4">
          <div className="w-full">
            <main className="h-screen">
              <div className="flex h-screen flex-col items-center justify-center gap-4">
                <h1 className="text-5xl font-thin tracking-tight sm:text-[5rem]">
                  <span>
                    <Image
                      className="inline pb-4"
                      /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
                      src={infSvg?.src}
                      alt="INF"
                      width={128}
                      height={128}
                    />
                  </span>{" "}
                  Posts Assessment
                </h1>
                <Link href="/posts">View Posts</Link>
              </div>
            </main>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
