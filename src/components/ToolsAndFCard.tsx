import { ElementType, JSX } from "react";

interface ToolsAndFCardProps {
  title: string;
  body: string;
  icon: ElementType;
  actions?: JSX.Element;
}

const ToolsAndFCard = ({ title, body, icon: Icon, actions }: ToolsAndFCardProps) => {
  return (
    <div className="p-5 rounded-2xl bg-foreground/5 w-[260px]">
      <div className="flex justify-between items-center w-full gap-2">
        <div className="rounded-full p-2 bg-foreground/10 w-fit">
          <Icon size={18} />
        </div>
        {actions}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-3 text-sm text-foreground/80">
          {body}
        </p>
      </div>
    </div>
  );
};

export default ToolsAndFCard;
