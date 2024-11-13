import Image from 'next/image';
import { usePeerIds, useRemotePeer } from '@huddle01/react/hooks';
import useStore from '@/store/slices';
import { Role } from '@huddle01/server-sdk/auth';
import { getFallbackAvatar } from '@/utils/helpers';

type AcceptRequestProps = {
  peerId: string;
};

const AcceptRequest: React.FC<AcceptRequestProps> = ({ peerId }) => {
  const { metadata, updateRole } = useRemotePeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>({ peerId });

  const { setShowAcceptRequest, removeRequestedPeers } = useStore();

  return (
    <div className="inline-flex p-4 flex-col justify-center items-center rounded-lg bg-custom-2">
      <div className="flex flex-col justify-center items-start gap-2">
        <Image
          src={metadata?.avatarUrl ?? getFallbackAvatar()}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="font-inter text-sm font-semibold text-slate-100">
          {metadata?.displayName} requested to be a speaker
        </div>
        <div className="font-inter text-xs text-slate-100">
          You can view all the requests in the sidebar
        </div>
        <div className="flex items-start gap-2">
          <button
            className="flex w-20 px-1 py-2 items-center justify-center bg-custom-8 font-medium rounded-lg text-sm"
            onClick={() => {
              updateRole(Role.SPEAKER);
              setShowAcceptRequest(false);
              removeRequestedPeers(peerId);
            }}
          >
            Accept
          </button>
          <button
            className="flex w-20 px-1 py-2 items-center justify-center rounded-lg text-red-400 text-sm font-medium border border-red-400"
            onClick={() => {
              setShowAcceptRequest(false);
              removeRequestedPeers(peerId);
            }}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptRequest;
