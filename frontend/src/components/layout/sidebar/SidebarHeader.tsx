import Favicon from "../../../../assets/Favicon.png";
import LOGO from "../../../../assets/LOGO.png";

interface SidebarHeaderProps {
  collapsed: boolean;
  borderDivider: string;
  timeOfDay: 'day' | 'sunset' | 'night';
}

export default function SidebarHeader({ collapsed, borderDivider, timeOfDay }: SidebarHeaderProps) {
  return (
    <div className={`p-3 border-b-2 ${borderDivider} min-h-[52px]`}>
      {!collapsed ? (
        <div className="flex items-center gap-2 animate-fadeIn">
          <img src={Favicon} alt="DevGarden" className="w-8 h-8 object-cover" />
          <img
            src={LOGO}
            alt="DevGarden Logo"
            className={`w-[120px] object-cover ${timeOfDay !== 'day' ? 'brightness-125 contrast-125' : ''}`}
          />
        </div>
      ) : (
        <img src={Favicon} alt="DevGarden" className="flex items-center w-9 h-9 object-cover" />
      )}
    </div>
  );
}
