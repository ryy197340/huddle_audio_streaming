import { useLocalPeer, usePeerIds } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';
import CoHosts from './ViewPorts/CoHosts';
import Hosts from './ViewPorts/Hosts';
import Speakers from './ViewPorts/Speakers';
import Listeners from './ViewPorts/Listeners';

type GridLayoutProps = {};

const GridLayout: React.FC<GridLayoutProps> = () => {
  const { peerIds } = usePeerIds({ roles: [Role.LISTENER] });
  const { role: localPeerRole } = useLocalPeer();

  return (
    <div className="w-full h-full ml-10 flex items-center justify-center flex-col py-20">
      <div className="flex-wrap flex items-center justify-center gap-4 w-full">
        <Hosts />
        <CoHosts />
        <Speakers />
      </div>
      <div className="mt-10">
        <div className="text-custom-6 text-base font-normal text-center mb-5">
          Listeners -{' '}
          {peerIds.length +
            (localPeerRole && localPeerRole === Role.LISTENER ? 1 : 0)}
        </div>
        <div className="flex-wrap flex items-center justify-center gap-4 w-full">
          <Listeners />
        </div>
      </div>
    </div>
  );
};
export default GridLayout;
