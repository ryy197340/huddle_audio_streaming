import type React from 'react';
import Strip from './Strip';
import { useRoom, useLocalPeer, useRemotePeer } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';

type ListenersDataProps = {
  peerId: string;
};

const ListenersData: React.FC<ListenersDataProps> = ({ peerId }) => {
  const { leaveRoom, kickPeer } = useRoom();
  const { updateRole } = useRemotePeer({ peerId });
  const me = useLocalPeer();

  return (
    <>
      {me.role === 'host' && (
        <>
          <Strip
            type="personSpeaker"
            title="Invite as Host"
            variant="normal"
            onClick={() => updateRole(Role.HOST)}
          />
          <Strip
            type="personSpeaker"
            title="Invite as Co-Host"
            variant="normal"
            onClick={() => updateRole(Role.CO_HOST)}
          />
        </>
      )}
      {me.role === 'coHost' || me.role === 'host' ? (
        <>
          <Strip
            type="personSpeaker"
            title="Invite as Speaker"
            variant="normal"
            onClick={() => updateRole(Role.SPEAKER)}
          />
          <Strip
            type="leave"
            title="Remove from space"
            variant="danger"
            onClick={() => kickPeer(peerId)}
          />
        </>
      ) : (
        <Strip
          type="leave"
          title="Leave the space"
          variant="danger"
          onClick={() => leaveRoom()}
        />
      )}
    </>
  );
};
export default ListenersData;
