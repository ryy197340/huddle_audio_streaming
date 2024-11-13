'use client';

import type React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type LobbyPageProps = {
  roomId: string;
};

const IntroPage: React.FC<LobbyPageProps> = ({ roomId }) => {
  const { push } = useRouter();

  useEffect(() => {
    push(`/${roomId}/lobby`);
  }, []);

  return null;
};
export default IntroPage;
