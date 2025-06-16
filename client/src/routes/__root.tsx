import { Header } from "@components/layout/header";
import { Footer } from "@components/layout/footer";
import { type NavBarNavigation, NavBar } from "@components/layout/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const tabs: NavBarNavigation = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
];

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header>
        <NavBar navigation={tabs} />
      </Header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  ),
});
