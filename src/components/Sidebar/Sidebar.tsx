import React from 'react';

// Store
import useStore from '@/store/slices';
import { cn } from '@/utils/helpers';
import Header from './Header/Header';
import ViewComponent from './ViewController';
import { BasicIcons } from '@/assets/BasicIcons';

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const isSidebarOpen = useStore((state) => state.sidebar.isSidebarOpen);

  const sidebarView = useStore((state) => state.sidebar.sidebarView);
  const setSidebarView = useStore((state) => state.setSidebarView);

  if (sidebarView === 'close') return null;

  return (
    <aside
      className={cn(
        'w-1/4 bg-custom-3 h-[40rem] mr-1 rounded-md  transition-all duration-300 ease-out flex-col max-h-[80vh] my-16',
        isSidebarOpen ? 'flex' : 'hidden',
      )}
    >
      <Header
        title="Peers"
        icon={BasicIcons.peers}
        onClose={() => {
          setSidebarView('close');
        }}
      />

      <div className="px-6 py-4 overflow-y-auto noScrollbar">
        {ViewComponent[sidebarView].component}
      </div>
    </aside>
  );
};
export default React.memo(Sidebar);
