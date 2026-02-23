import Link from "next/link";
import LayoutMain from "../layouts/layout";
import { mainList } from "@/constants";

const MainPage = () => {
  return (
    <LayoutMain>
      <p className="text-center text-2xl font-semibold mt-15 text-theme ">
        تسک تستی برای موسسه فرهنگی بهمن سبز
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8 p-6 
                      bg-white/70 backdrop-blur-md border border-gray-200 
                      rounded-2xl shadow-md max-w-xl mx-auto">
        {mainList.map((task) => (
          <Link
            key={task.href}
            href={task.href}
            className="px-5 py-2.5 rounded-xl border border-theme text-theme 
                       bg-gray-100 hover:bg-theme  transition-all 
                       duration-300 shadow-sm"
          >
            {task.label}
          </Link>
        ))}
      </div>
    </LayoutMain>
  );
};

export default MainPage;
