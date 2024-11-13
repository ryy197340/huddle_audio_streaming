import { useLocalPeer, usePeerIds } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';
import { memo } from 'react';
import LocalGridCard from '../GridCard/LocalGridCard';
import RemoteGridCard from '../GridCard/RemoteGridCard';

const Speakers = () => {
  const { peerIds } = usePeerIds({ roles: [Role.CO_HOST] });
  const { peerId: localPeerId, role: localPeerRole } = useLocalPeer();

  return (
    <>
      {localPeerRole === Role.CO_HOST && localPeerId && (
        <LocalGridCard key={`grid-${localPeerId}`} />
      )}
      {peerIds.map((peerId) => {
        return <RemoteGridCard key={`grid-${peerId}`} peerId={peerId} />;
      })}
    </>
  );
};

export default memo(Speakers);
