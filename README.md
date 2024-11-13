# Huddle01 Audio Spaces Demo App 🎙️

A beginner-friendly demo application showcasing how to build audio spaces using Huddle01's React SDK. This project demonstrates real-time audio communication features similar to Twitter Spaces or Clubhouse, built with Next.js, TypeScript, and Zustand.

## 🚀 Features

- **Audio Space Creation**: Create and join real-time audio rooms
- **Role-Based Access Control**: Support for different participant roles
  - Host: Full room control and management
  - Co-Host: Room management with limited permissions
  - Speaker: Active participation rights
  - Listener: Listen-only access with reaction capabilities
- **Interactive Elements**:
  - Raise Hand functionality
  - Real-time reactions
  - Speaker requests
  - Peer list management
- **Custom UI Components**: Pre-built components matching Huddle01's design system

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [@huddle01/react](https://www.npmjs.com/package/@huddle01/react) (v2.2.1) - Huddle01 React SDK
- [@huddle01/server-sdk](https://www.npmjs.com/package/@huddle01/server-sdk) (v2.5.2) - Huddle01 Server SDK

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Huddle01/Audio-spaces-example-app-v2
```

2. **Install dependencies**
```bash
pnpm i
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add the following:
```env
NEXT_PUBLIC_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_PROJECT_ID=YOUR_PROJECT_ID
```

> 📝 Get your API credentials by connecting your wallet at the [Huddle01 API Keys Page](https://www.huddle01.com/docs/api-keys)

4. **Start the development server**
```bash
pnpm run dev
```

## 💡 Key Concepts

### Peer Management

Use the `usePeerIds` hook to filter and manage peers based on their roles:

```typescript
import { usePeerIds } from "@huddle01/react/hooks";
import { Role } from '@huddle01/server-sdk/auth';

const { peerIds } = usePeerIds({ role: Role.SPEAKER });
```

### Remote Peer Data

Access remote peer information using the `useRemotePeer` hook:

```typescript
import { useRemotePeer } from "@huddle01/react/hooks";

const { metadata, role } = useRemotePeer<{
  displayName: string;
  avatarUrl: string;
  isHandRaised: boolean;
}>({ peerId });
```

### Role Management

Update peer roles using the `updateRole` method:

```typescript
import { useRemotePeer } from "@huddle01/react/hooks";
import { Role } from '@huddle01/server-sdk/auth';

const { updateRole } = useRemotePeer({ peerId });
updateRole(Role.CO_HOST);
```

### Interactive Features

1. **Raise Hand**
```typescript
import { useLocalPeer } from "@huddle01/react/hooks";

const { updateMetadata, metadata } = useLocalPeer<{
  displayName: string;
  avatarUrl: string;
  isHandRaised: boolean;
}>();

// Raise hand
updateMetadata({ ...metadata, isHandRaised: true });
```

2. **Send Reactions and Speaker Requests**
```typescript
import { useDataMessage, usePeerIds } from "@huddle01/react/hooks";
import { Role } from '@huddle01/server-sdk/auth';

const { sendData } = useDataMessage();

// Send reaction to all peers
const sendReaction = (emoji: string) => {
  sendData({ to: "*", payload: emoji, label: "emoji" });
};

// Send speaker request
const sendSpeakerRequest = () => {
  const { peerIds } = usePeerIds({ roles: [Role.HOST, Role.CO_HOST] });
  sendData({ to: peerIds, payload: peerId, label: "speakerRequest" });
};
```

## 📚 Documentation

For more detailed information about Huddle01 Audio Spaces, please refer to our [official documentation](https://docs.huddle01.com/docs/guides/audio-spaces).

Made with ❤️ by Huddle01 team.
