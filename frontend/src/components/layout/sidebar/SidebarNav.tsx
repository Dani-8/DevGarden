import { LucideIcon } from 'lucide-react';

export interface NavItem {
    id: string;
    icon: LucideIcon;
    label: string;
    title: string;
    onClick: () => void;
    shortcut?: string;
    className: string;
}

interface SidebarNavProps {
    items: NavItem[];
    collapsed: boolean;
}

export default function SidebarNav({ items, collapsed }: SidebarNavProps) {
    return (
        <>
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={item.onClick}
                        className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none ${collapsed ? 'justify-center' : ''
                            } ${item.className}`}
                        title={item.title}
                    >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        {!collapsed && (
                            <div className="flex items-center justify-between flex-1">
                                <span className="animate-fadeIn">{item.label}</span>
                                {item.shortcut && (
                                    <span className="bg-black/10 px-1 py-0.2 rounded text-[8px] font-mono font-bold opacity-75">
                                        {item.shortcut}
                                    </span>
                                )}
                            </div>
                        )}
                    </button>
                );
            })}
        </>
    );
}
