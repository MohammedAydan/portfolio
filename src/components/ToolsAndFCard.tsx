import { ElementType } from "react";

interface ToolsAndFCardProps {
  title: string;
  body: string;
  icon: ElementType;
}

const ToolsAndFCard = ({ title, body, icon: Icon }: ToolsAndFCardProps) => {
  return (
    <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/10 w-[260px]">
      <div className="rounded-full p-2 bg-black/10 dark:bg-white/10 w-fit">
        <Icon size={20} className="text-blue-600 dark:text-blue-400" />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          {title}
        </h3>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {body}
        </p>
      </div>
    </div>
  );
};

export default ToolsAndFCard;
