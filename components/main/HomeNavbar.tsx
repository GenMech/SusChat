"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeNavbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("data after signin:", session);
  console.log("status:", status);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="fixed top-0 flex items-center gap-5 justify-between w-full py-4 px-10 z-10 transition-all">
      <div className="flex items-center z-10">
        <Link href="/" className="flex items-center gap-6 py-4 pr-4">
          <span className="text-xl text-white font-bold">Voyex.</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 z-10">
        {session ? (
          <>
            <span className="text-white text-base font-medium">
              Hello, {session.user?.name}
            </span>
            <button
              onClick={handleSignOut}
              className="text-fontlight text-base font-medium py-2 px-9 rounded-xl bg-btnlime capitalize"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signup">
              <button className="text-btnlime text-base font-medium py-3 px-4 rounded-xl bg-none capitalize">
                Sign Up
              </button>
            </Link>
            <Link href="/auth/signin">
              <button className="text-fontlight text-base font-medium py-2 px-9 rounded-3xl bg-btnlime capitalize">
                Log In
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
