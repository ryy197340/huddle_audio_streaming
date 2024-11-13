import { NestedPeerListIcons, PeerListIcons } from '@/assets/PeerListIcons';
import Dropdown from '@/components/common/Dropdown';
import { cn, getFallbackAvatar } from '@/utils/helpers';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import HostData from '../PeerRole/HostData';
import CoHostData from '../PeerRole/CoHostData';
import SpeakerData from '../PeerRole/SpeakerData';
import ListenersData from '../PeerRole/ListenersData';
import {
  useDataMessage,
  useRemoteAudio,
  useRemotePeer,
} from '@huddle01/react/hooks';
import useStore from '@/store/slices';
import { Role } from '@huddle01/server-sdk/auth';

interface PeerMetaDatProps {
  isRequested?: boolean;
  className?: string;
  peerId: string;
}

const PeerMetaData: React.FC<PeerMetaDatProps> = ({
  className,
  isRequested,
  peerId,
}) => {
  const RoleData = {
    host: <HostData peerId={peerId} />,
    coHost: <CoHostData peerId={peerId} />,
    speaker: <SpeakerData peerId={peerId} />,
    listener: <ListenersData peerId={peerId} />,
  } as const;

  const { role, metadata, updateRole } = useRemotePeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>({ peerId });

  const { isAudioOn } = useRemoteAudio({ peerId });

  const removeRequestedPeers = useStore((state) => state.removeRequestedPeers);

  return (
    <div className={cn(className, 'flex items-center justify-between w-full')}>
      <div className="flex items-center gap-2">
        <Image
          src={metadata?.avatarUrl ?? getFallbackAvatar()}
          alt="default"
          width={30}
          height={30}
          priority
          quality={100}
          className="object-contain rounded-full"
        />
        <div className="text-slate-400 tex-sm font-normal">
          {metadata?.displayName}
        </div>
      </div>
      {isRequested ? (
        <AcceptDenyGroup
          onDeny={() => {
            if (peerId) {
              removeRequestedPeers(peerId);
            }
          }}
          onAccept={() => {
            if (peerId && role && ['host', 'coHost'].includes(role)) {
              updateRole(Role.SPEAKER);
              removeRequestedPeers(peerId);
            }
          }}
        />
      ) : (
        <div className="flex items-center gap-3">
          <button onClick={() => {}}>
            {metadata?.isHandRaised
              ? NestedPeerListIcons.active.hand
              : NestedPeerListIcons.inactive.hand}
          </button>
          <button>
            {isAudioOn
              ? NestedPeerListIcons.active.mic
              : NestedPeerListIcons.inactive.mic}
          </button>
          <Dropdown
            triggerChild={<div>{NestedPeerListIcons.inactive.more}</div>}
            align="end"
          >
            {role && RoleData[role as keyof typeof RoleData]}
          </Dropdown>{' '}
        </div>
      )}
    </div>
  );
};

export default React.memo(PeerMetaData);

interface IAcceptDenyProps {
  onAccept?: () => void;
  onDeny?: () => void;
}

const AcceptDenyGroup: React.FC<IAcceptDenyProps> = ({ onAccept, onDeny }) => (
  <div className="flex items-center gap-4">
    <div role="presentation" onClick={onAccept}>
      {PeerListIcons.accept}
    </div>
    <div role="presentation" onClick={onDeny}>
      {PeerListIcons.deny}
    </div>
  </div>
);
