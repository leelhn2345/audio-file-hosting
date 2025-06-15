import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui/navigation-menu";

export type NavBarNavigation = { href: string; title: string }[];

type Props = { navigation: NavBarNavigation };

export function NavBar({ navigation }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigation.map((x) => (
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="focus:bg-transparent">
              <Link to={x.href} className="[&.active]:font-bold">
                <span className="text-xl">{x.title}</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
