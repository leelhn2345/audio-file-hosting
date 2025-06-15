import { NavBar, type NavBarNavigation } from "@components/layout/header";
import { Header } from "@components/layout/true-header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const tabs: NavBarNavigation = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
];

export const Route = createRootRoute({
  component: () => (
    <>
      <Header>
        <NavBar navigation={tabs} />
      </Header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
