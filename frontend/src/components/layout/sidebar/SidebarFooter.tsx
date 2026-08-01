import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarFooterProps {
    collapsed: boolean;
    onLogout: () => void;
    onToggleCollapse: () => void;
    theme: {
        borderDivider: string;
        textSecondary: string;
        btnSecondary: string;
    };
}

export default function SidebarFooter({
    collapsed,
    onLogout,
    onToggleCollapse,
    theme,
}: SidebarFooterProps) {
    return (
        <div className={`p-2.5 border-t-2 ${theme.borderDivider} flex flex-col gap-1.5`}>
            <button
                onClick={onLogout}
                className={`w-full py-1.5 px-2.5 rounded-lg flex items-center gap-2 font-sans text-[11px] font-bold transition-all border border-transparent hover:border-red-600/60 hover:bg-red-500/20 ${theme.textSecondary
                    } hover:text-red-500 cursor-pointer ${collapsed ? 'justify-center' : ''}`}
                title="Sign Out of Garden"
            >
                <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
                {!collapsed && <span className="animate-fadeIn">Log Out</span>}
            </button>

            <button
                onClick={onToggleCollapse}
                className={`w-full mt-0.5 py-1.5 px-2.5 rounded-lg border-2 ${theme.btnSecondary} text-[#3a2f28] flex items-center ${collapsed ? 'justify-center' : 'gap-2'
                    } font-sans text-[11px] font-bold transition-all cursor-pointer shadow-sm focus-visible:outline-none`}
                title={collapsed ? 'Expand Sidebar' : 'Hide Menu'}
            >
                {collapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                ) : (
                    <>
                        <ChevronLeft className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="animate-fadeIn">Hide Menu</span>
                    </>
                )}
            </button>
        </div>
    );
}
