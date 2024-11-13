import type React from 'react';
import { use, useState } from 'react';

// Assets
import { BasicIcons } from '@/assets/BasicIcons';

// Components
import PeerList from './PeerList';
import PeerMetaData from './PeerMetaData/LocalPeerMetaData';

// Hooks
import { useLocalPeer, usePeerIds, useRoom } from '@huddle01/react/hooks';

import useStore from '@/store/slices';
import HostsList from './SidebarViewPorts/HostsList';
import CoHostsList from './SidebarViewPorts/CoHostsList';
import { Role } from '@huddle01/server-sdk/auth';
import SpeakersList from './SidebarViewPorts/SpeakersList';
import ListenersList from './SidebarViewPorts/ListenersList';
import AcceptDenyPeer from './PeerMetaData/AcceptDenyPeer';
import toast from 'react-hot-toast';

type PeersProps = {};

const Peers: React.FC<PeersProps> = () => {
  const BlackList = ['peer', 'listener'];

  const me = useLocalPeer();
  const { muteEveryone } = useRoom();
  const requestedPeers = useStore((state) => state.requestedPeers);
  const { peerIds: hostPeerIds } = usePeerIds({ roles: [Role.HOST] });
  const { peerIds: coHostPeerIds } = usePeerIds({ roles: [Role.CO_HOST] });
  const { peerIds: speakerPeerIds } = usePeerIds({ roles: [Role.SPEAKER] });
  const { peerIds: listenerPeerIds } = usePeerIds({ roles: [Role.LISTENER] });

  return (
    <div>
      <MuteMicDiv
        onClick={() =>
          me.role === Role.HOST ? muteEveryone() : toast.error('No Permission')
        }
      />

      {requestedPeers.length > 0 && (
        <PeerList className="mt-5" title="Requested to Speak">
          {requestedPeers.map((peerId) => {
            return <AcceptDenyPeer key={`sidebar-${peerId}`} peerId={peerId} />;
          })}
        </PeerList>
      )}

      {/* Host */}
      {(hostPeerIds.length > 0 || me.role === Role.HOST) && (
        <PeerList
          count={hostPeerIds.length + (me.role === 'host' ? 1 : 0)}
          className="mt-5"
          title="Hosts"
        >
          <HostsList className="mt-5" />
        </PeerList>
      )}
      {/* Co-Hosts */}
      {(coHostPeerIds.length > 0 || me.role === Role.CO_HOST) && (
        <PeerList
          title="Co-Hosts"
          count={coHostPeerIds.length + (me.role === 'co-host' ? 1 : 0)}
        >
          <CoHostsList className="mt-5" />
        </PeerList>
      )}

      {/* Speakers */}
      {(speakerPeerIds.length > 0 || me.role === Role.SPEAKER) && (
        <PeerList
          title="Speakers"
          count={speakerPeerIds.length + (me.role === 'speaker' ? 1 : 0)}
        >
          <SpeakersList className="mt-5" />
        </PeerList>
      )}

      {/* listeners */}
      {(listenerPeerIds.length > 0 || me.role === Role.LISTENER) && (
        <PeerList
          title="Listeners"
          count={listenerPeerIds.length + (me.role === 'listener' ? 1 : 0)}
        >
          <ListenersList className="mt-5" />
        </PeerList>
      )}
    </div>
  );
};
export default Peers;

interface Props {
  onClick: () => void;
}

const MuteMicDiv: React.FC<Props> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center border border-custom-4 rounded-lg p-2 gap-2 w-full"
  >
    <span>{BasicIcons.muteMic}</span>
    <span className="text-custom-6 text-sm font-semibold">Mute Everyone</span>
  </button>
);
