import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Container from "@/components/Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4 h-16">
          <p className="text-lg font-bold">
            <Link href="/dashboard">Invoice App</Link>
          </p>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
