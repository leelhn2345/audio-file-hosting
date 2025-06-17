import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAtomValue } from "jotai";
import { userAtom } from "@stores/user";

export type NavBarNavigation = {
  href: string;
  title: string;
  authNeeded?: boolean;
}[];

type Props = { navigation: NavBarNavigation };

export function NavBar({ navigation }: Props) {
  const user = useAtomValue(userAtom);
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {navigation.map((x) =>
          x.authNeeded ? (
            user && (
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
            )
          ) : (
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
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
