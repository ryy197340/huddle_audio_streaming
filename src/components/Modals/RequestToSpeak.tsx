import { NestedBasicIcons } from '@/assets/BasicIcons';
import type React from 'react';
import Button from '../common/Button';
import useStore from '@/store/slices';
import {
  useDataMessage,
  useHuddle01,
  useLocalPeer,
  usePeerIds,
} from '@huddle01/react/hooks';
import { Role } from '@huddle01/server-sdk/auth';

type RequestToSpeakProps = {};

const RequestToSpeak: React.FC<RequestToSpeakProps> = () => {
  const setPromptView = useStore((state) => state.setPromptView);

  const { peerId } = useLocalPeer();
  const { sendData } = useDataMessage();

  const { peerIds } = usePeerIds({
    roles: [Role.HOST, Role.CO_HOST, Role.SPEAKER],
  });

  const sendSpeakerRequest = () => {
    sendData({
      to: peerIds,
      payload: JSON.stringify({
        peerId,
      }),
      label: 'requestToSpeak',
    });
    setPromptView('close');
  };

  return (
    <div className="">
      <div>{NestedBasicIcons.active.mic}</div>
      <div className="mt-4 mb-8">
        <div className="text-xl font-medium text-custom-7">
          Request to speak
        </div>
        <div className="max-w-[20rem] text-custom-6 text-sm">
          You will become a speaker once your request is accepted by the Host or
          Co-host
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <Button
          type="button"
          className="bg-custom-3 w-36 text-custom-6"
          onClick={() => setPromptView('close')}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="w-36 bg-custom-8"
          onClick={sendSpeakerRequest}
        >
          Send Request
        </Button>
      </div>
    </div>
  );
};
export default RequestToSpeak;
