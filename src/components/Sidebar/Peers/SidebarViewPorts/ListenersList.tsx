import { useLocalPeer, usePeerIds } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';
import { type FC, memo } from 'react';
import RemotePeerMetaData from '../PeerMetaData/RemotePeerMetaData';
import LocalPeerMetaData from '../PeerMetaData/LocalPeerMetaData';

interface ListenersListProps {
  className?: string;
}

const ListnersList: FC<ListenersListProps> = ({ className }) => {
  const { peerIds } = usePeerIds({ roles: [Role.LISTENER] });
  const { peerId: localPeerId, role: localPeerRole } = useLocalPeer();

  return (
    <>
      {localPeerRole === Role.LISTENER && localPeerId && (
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

export default ListnersList;
