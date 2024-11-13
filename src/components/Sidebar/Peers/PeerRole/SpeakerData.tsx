import type React from 'react';
import Strip from './Strip';
import { useLocalPeer, useRemotePeer, useRoom } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';

type SpeakerDataProps = {
  peerId: string;
};

const Speaker: React.FC<SpeakerDataProps> = ({ peerId }) => {
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
            onClick={() => {
              updateRole(Role.HOST);
            }}
          />
          <Strip
            type="personSpeaker"
            title="Invite as Co-Host"
            variant="normal"
            onClick={() => {
              updateRole(Role.CO_HOST);
            }}
          />
        </>
      )}
      {me.role && ['host', 'coHost'].includes(me.role) && (
        <>
          <Strip
            type="remove"
            title="Remove as Speaker"
            variant="danger"
            onClick={() => updateRole(Role.LISTENER)}
          />
          <Strip
            type="leave"
            title="Remove from space"
            variant="danger"
            onClick={() => kickPeer(peerId)}
          />
        </>
      )}

      {me.role === 'speaker' && (
        <>
          <Strip
            type="leave"
            title="Leave speaker role"
            variant="danger"
            onClick={() => updateRole(Role.LISTENER)}
          />
          <Strip
            type="remove"
            title="Leave the space"
            variant="danger"
            onClick={() => leaveRoom()}
          />
        </>
      )}
    </>
  );
};
export default Speaker;
