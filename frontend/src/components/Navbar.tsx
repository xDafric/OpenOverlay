import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ThemeToggle from "./ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { AvatarDropdown } from "./custom-ui/avatar-dropdown";
import Banner from "./custom-ui/banner";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();

  return (
    <>
      <div className="sticky top-0 flex flex-col">
        {session?.user && !session.user.emailVerified && (
          <Banner
            title="Email not verified!"
            description={`Please verify your email by clicking the link sent to <strong>${session.user.email}</strong>`}
            linkText="Resend verification email"
            linkUrl=""
            className="bg-yellow-400/70"
          ></Banner>
        )}

        <div className="flex bg-muted justify-center h-16 w-screen items-center">
          <div className=" w-full mx-auto flex items-center justify-between px-10 ">
            <a className="text-xl font-bold" href="/">
              OpenOverlay
            </a>
            <div className="flex gap-8 items-center">
              <ThemeToggle />
              {session?.session ? (
                <>
                  <AvatarDropdown user={session.user} />
                </>
              ) : (
                <div className="flex gap-2">
                  <Button size={"sm"} onClick={() => navigate("/auth/login")}>
                    Sign In
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => navigate("/auth/signup")}
                    size={"sm"}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
