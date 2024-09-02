import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { HTMLAttributes, memo, useState } from "react";

interface TabProps {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  coming: boolean;
}

interface CustomTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: TabProps[];
}

const CustomTabs = ({ tabs, ...rest }: CustomTabsProps) => {
  const [tabsList, setCustomTabsList] = useState<TabProps[]>(tabs);
  const pathname = usePathname();

  return (
    <div {...rest} className={cn("", rest.className)}>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md"
          defaultValue={tabsList.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="bg-grenadier-100 w-fit px-3 py-2 rounded-full">
          <nav className="flex space-x-2" aria-label="CustomTabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  pathname == tab.href
                    ? "bg-grenadier-500 text-white"
                    : "border-transparent text-grenadier-900",
                  "group inline-flex items-center py-3 px-5 rounded-full text-sm font-bold"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={cn(
                    pathname == tab.href
                      ? "dark:text-web-orange-500"
                      : "dark:text-shark-300 text-shark-500 group-hover:text-shark-500 dark:group-hover:text-shark-400",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span className={`${tab.coming ? "line-through" : ""}`}>
                  {tab.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomTabs);
