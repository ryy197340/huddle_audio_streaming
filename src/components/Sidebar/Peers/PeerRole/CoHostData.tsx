import type React from 'react';
import Strip from './Strip';
import {
  useRoom,
  useHuddle01,
  useRemotePeer,
  useLocalPeer,
} from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';

type CoHostDataProps = {
  peerId: string;
};

const CoHostData: React.FC<CoHostDataProps> = ({ peerId }) => {
  const { updateRole } = useRemotePeer({ peerId });

  const me = useLocalPeer();

  const { leaveRoom, kickPeer } = useRoom();

  return (
    <>
      {me.role === 'host' && (
        <div>
          <Strip
            type="personSpeaker"
            title="Invite as Host"
            variant="normal"
            onClick={() => updateRole(Role.HOST)}
          />
          <Strip
            type="personSpeaker"
            title="Invite as Speaker"
            variant="normal"
            onClick={() => {
              updateRole(Role.SPEAKER);
            }}
          />
          <Strip
            type="remove"
            title="Remove as Co-Host"
            variant="danger"
            onClick={() => updateRole(Role.LISTENER)}
          />
          <Strip
            type="leave"
            title="Remove from space"
            variant="danger"
            onClick={() => kickPeer(peerId)}
          />
        </div>
      )}
      {me.role === 'coHost' && (
        <div>
          <Strip
            type="leave"
            title="Leave the spaces"
            variant="danger"
            onClick={leaveRoom}
          />
          <Strip
            type="leave"
            title="Leave co-host role"
            variant="danger"
            onClick={() => updateRole(Role.LISTENER)}
          />
        </div>
      )}
    </>
  );
};
export default CoHostData;
