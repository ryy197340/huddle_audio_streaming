import { PeerListIcons } from '@/assets/PeerListIcons';
import useStore from '@/store/slices';
import { getFallbackAvatar } from '@/utils/helpers';
import { useRemotePeer } from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';
import Image from 'next/image';
import type { FC } from 'react';

interface AcceptDenyPeerProps {
  peerId: string;
}

const AcceptDenyPeer: FC<AcceptDenyPeerProps> = ({ peerId }) => {
  const { metadata, updateRole } = useRemotePeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>({ peerId });

  const removeRequestedPeers = useStore((state) => state.removeRequestedPeers);

  return (
    <div className="flex items-center justify-between w-full">
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
      <div className="flex items-center gap-4">
        <div
          role="presentation"
          onClick={() => {
            updateRole(Role.SPEAKER);
            removeRequestedPeers(peerId);
          }}
        >
          {PeerListIcons.accept}
        </div>
        <div
          role="presentation"
          onClick={() => {
            removeRequestedPeers(peerId);
          }}
        >
          {PeerListIcons.deny}
        </div>
      </div>
    </div>
  );
};

export default AcceptDenyPeer;
