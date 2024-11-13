import { BasicIcons } from '@/assets/BasicIcons';
import { cn } from '@/utils/helpers';
import type React from 'react';
import { useDataMessage, useLocalPeer } from '@huddle01/react/hooks';
import useStore from '@/store/slices';

type peerMetaData = {
  displayName: string;
  avatarUrl: string;
  isHandRaised: boolean;
};

type Reaction =
  | ''
  | '😂'
  | '😢'
  | '😦'
  | '😍'
  | '🤔'
  | '👀'
  | '🙌'
  | '👍'
  | '👎'
  | '🔥'
  | '🍻'
  | '🚀'
  | '🎉'
  | '❤️'
  | '💯';

interface Props {
  onClose: () => void;
  onClick: (reaction: Reaction) => void;
}

const EmojiTray: React.FC<Props> = ({ onClick, onClose }) => {
  // Emoji Data
  const emojis: Reaction[] = [
    '😂',
    '😢',
    '😦',
    '😍',
    '🤔',
    '👀',
    '🙌',
    '👍',
    '👎',
    '🔥',
    '🍻',
    '🚀',
    '🎉',
    '❤️',
    '💯',
  ];

  const { sendData } = useDataMessage();
  const setMyReaction = useStore((state) => state.setMyReaction);

  const { metadata, updateMetadata } = useLocalPeer<peerMetaData>();

  return (
    <div>
      <div className="relative">
        <div className=" border-b border-slate-700 py-3 text-center text-base font-semibold text-slate-100">
          Reactions
          <span
            className="absolute right-2 cursor-pointer"
            role="presentation"
            onClick={onClose}
          >
            {BasicIcons.close}
          </span>
        </div>
      </div>
      <div className="px-4 py-3.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            updateMetadata({
              ...metadata,
              isHandRaised: !metadata?.isHandRaised,
            } as peerMetaData);
          }}
          className={cn(
            ' w-full text-sm text-slate-100 py-2 rounded-lg font-inter flex items-center justify-center font-medium',
            metadata?.isHandRaised ? 'bg-custom-1' : 'bg-custom-8',
          )}
        >
          ✋ {metadata?.isHandRaised ? 'Lower Hand' : 'Raise Hand'}
        </button>
        <div className="grid grid-cols-5 place-items-center gap-2">
          {emojis.map((emoji) => (
            <span
              key={emoji}
              onClick={() => {
                sendData({
                  to: '*',
                  payload: emoji,
                  label: 'reaction',
                });
                setMyReaction(emoji);
              }}
              role="presentation"
              className="m-1 cursor-pointer p-2 text-lg"
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiTray;
