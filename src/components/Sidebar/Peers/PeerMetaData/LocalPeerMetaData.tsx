import { NestedPeerListIcons, PeerListIcons } from '@/assets/PeerListIcons';
import Dropdown from '@/components/common/Dropdown';
import { cn, getFallbackAvatar } from '@/utils/helpers';
import Image from 'next/image';
import HostData from '../PeerRole/HostData';
import CoHostData from '../PeerRole/CoHostData';
import SpeakerData from '../PeerRole/SpeakerData';
import ListenersData from '../PeerRole/ListenersData';
import { useLocalAudio, useLocalPeer } from '@huddle01/react/hooks';
import useStore from '@/store/slices';
import { Role } from '@huddle01/server-sdk/auth';
import { memo } from 'react';

interface PeerMetaDatProps {
  isRequested?: boolean;
  className?: string;
}

const PeerMetaData: React.FC<PeerMetaDatProps> = ({
  className,
  isRequested,
}) => {
  const { metadata, peerId, role, updateRole, updateMetadata } = useLocalPeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>();

  const RoleData = {
    host: peerId && <HostData peerId={peerId} />,
    coHost: peerId && <CoHostData peerId={peerId} />,
    speaker: peerId && <SpeakerData peerId={peerId} />,
    listener: peerId && <ListenersData peerId={peerId} />,
  } as const;

  const {
    enableAudio,
    disableAudio,
    stream: micStream,
    isAudioOn,
  } = useLocalAudio();

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
              updateRole({ role: Role.SPEAKER });
              removeRequestedPeers(peerId);
            }
          }}
        />
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              // if (peerId === localPeerId) {
              updateMetadata({
                displayName: metadata?.displayName ?? 'Guest',
                avatarUrl: metadata?.avatarUrl ?? getFallbackAvatar(),
                isHandRaised: !metadata?.isHandRaised,
              });
              // }
            }}
          >
            {metadata?.isHandRaised
              ? NestedPeerListIcons.active.hand
              : NestedPeerListIcons.inactive.hand}
          </button>
          <button
            onClick={() => {
              if (role && ['host', 'coHost', 'speaker'].includes(role)) {
                isAudioOn ? disableAudio() : enableAudio();
              }
            }}
          >
            {isAudioOn
              ? NestedPeerListIcons.active.mic
              : NestedPeerListIcons.inactive.mic}
          </button>

          <Dropdown
            triggerChild={<div>{NestedPeerListIcons.inactive.more}</div>}
            align="end"
          >
            {role && RoleData[role as keyof typeof RoleData]}
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default memo(PeerMetaData);

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
