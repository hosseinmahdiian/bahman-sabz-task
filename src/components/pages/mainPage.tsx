import Link from "next/link";
import LayoutMain from "../layouts/layout";
import { mainList } from "@/constants";

const MainPage = () => {
  return (
    <LayoutMain>
      <p className="text-center text-2xl font-semibold mt-28 text-theme ">
        تسک تستی برای موسسه فرهنگی بهمن سبز
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8 p-6 backdrop-blur-md rounded-2xl  max-w-xl mx-auto">
        {mainList.map((task) => (
          <Link
            key={task.href}
            href={task.href}
            className="px-5 py-2.5 rounded-xl border border-theme text-theme bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 shadow-sm"
          >
            {task.label}
          </Link>
        ))}
      </div>

      <p className="text-center text-2xl font-semibold mt-15 text-theme ">
        برای تجربه بهتر از VPN استفاده کنید
      </p>
    </LayoutMain>
  );
};

export default MainPage;
