import { useLocalPeer, usePeerIds } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';
import type { FC } from 'react';
import RemotePeerMetaData from '../PeerMetaData/RemotePeerMetaData';
import LocalPeerMetaData from '../PeerMetaData/LocalPeerMetaData';

interface CoHostsListProps {
  className?: string;
}

const CoHostsList: FC<CoHostsListProps> = ({ className }) => {
  const { peerIds } = usePeerIds({ roles: [Role.CO_HOST] });
  const { peerId: localPeerId, role: localPeerRole } = useLocalPeer();

  return (
    <>
      {localPeerRole === Role.CO_HOST && localPeerId && (
        <LocalPeerMetaData
          key={`sidebar-${localPeerId}`}
          className={className}
        />
      )}
      {peerIds.map((peerId) => {
        return (
          <RemotePeerMetaData
            key={`sidebar-${peerId}`}
            className={className}
            peerId={peerId}
          />
        );
      })}
    </>
  );
};

export default CoHostsList;
