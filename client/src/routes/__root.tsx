import { Header } from "@components/layout/header";
import { Footer } from "@components/layout/footer";
import { type NavBarNavigation, NavBar } from "@components/layout/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NotFound } from "@components/not-found";
import { ErrorComponent } from "@components/error";

const tabs: NavBarNavigation = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/audios", title: "Audios", authNeeded: true },
];

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
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
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});
