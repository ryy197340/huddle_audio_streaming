import React from 'react';
import Strip from './Strip';
import { useRoom, useLocalPeer, useRemotePeer } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';
import { PeerListIcons } from '@/assets/PeerListIcons';
import { cn } from '@/utils/helpers';

type HostDataProps = {
  peerId: string;
};

const HostData: React.FC<HostDataProps> = ({ peerId }) => {
  const { leaveRoom, closeRoom, kickPeer } = useRoom();
  const { updateRole, role } = useRemotePeer({ peerId });

  const me = useLocalPeer();

  return (
    <>
      {me.role === 'host' &&
        (me.peerId !== peerId ? (
          <>
            <Strip
              title="Invite as Co-Host"
              variant="normal"
              onClick={() => updateRole(Role.CO_HOST)}
              type="personSpeaker"
            />
            <Strip
              title="Invite as Speaker"
              variant="normal"
              onClick={() => updateRole(Role.SPEAKER)}
              type="personSpeaker"
            />
            <Strip
              title="Remove as Host"
              variant="danger"
              onClick={() => updateRole(Role.LISTENER)}
              type="remove"
            />
            <Strip
              title="Remove from space"
              variant="danger"
              onClick={() => kickPeer(peerId)}
              type="leave"
            />
          </>
        ) : (
          <>
            <Strip
              type="close"
              title="End spaces for all"
              variant="danger"
              onClick={() => closeRoom()}
            />
            <Strip
              type="leave"
              title="Leave the spaces"
              variant="danger"
              onClick={() => leaveRoom()}
            />
          </>
        ))}
    </>
  );
};
export default React.memo(HostData);
