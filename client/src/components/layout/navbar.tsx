import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export type NavBarNavigation = { href: string; title: string }[];

type Props = { navigation: NavBarNavigation };

export function NavBar({ navigation }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {navigation.map((x) => (
          <NavigationMenuItem key={x.title}>
            <NavigationMenuLink asChild>
              <Link
                to={x.href}
                className="rounded-lg px-4 py-2 text-lg font-extrabold text-gray-700 transition-all
                  duration-200 hover:bg-purple-50 hover:text-purple-600 [&.active]:bg-purple-50
                  [&.active]:font-semibold [&.active]:text-purple-600"
              >
                {x.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
