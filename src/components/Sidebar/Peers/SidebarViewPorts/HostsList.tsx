import { useLocalPeer, usePeerIds } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';
import { type FC, memo } from 'react';
import RemotePeerMetaData from '../PeerMetaData/RemotePeerMetaData';
import LocalPeerMetaData from '../PeerMetaData/LocalPeerMetaData';

interface HostsListProps {
  className?: string;
  isRequested?: boolean;
}

const HostsList: FC<HostsListProps> = ({ className, isRequested }) => {
  const { peerIds } = usePeerIds({ roles: [Role.HOST] });
  const { peerId: localPeerId, role: localPeerRole } = useLocalPeer();

  return (
    <>
      {localPeerRole === Role.HOST && localPeerId && (
        <LocalPeerMetaData
          key={`sidebar-${localPeerId}`}
          className={className}
          isRequested={isRequested}
        />
      )}
      {peerIds.map((peerId) => {
        return (
          <RemotePeerMetaData
            key={`sidebar-${peerId}`}
            className={className}
            peerId={peerId}
            isRequested={isRequested}
          />
        );
      })}
    </>
  );
};

export default HostsList;
