# Pollinations.AI React Hooks

Simple, type-safe React hooks for integrating Pollinations.AI into your Next.js app.

## Setup

The API token is already configured in `.env.local`:
```
NEXT_PUBLIC_POLLINATIONS_TOKEN=j3k4OHJEmksYYO1g
```

## Available Hooks

### 1. usePollinationsText
Generate text from a prompt.

```tsx
import { usePollinationsText } from '@/hooks';

function MyComponent() {
  const { text, loading, error } = usePollinationsText('Write a haiku about AI', {
    model: 'openai',
    temperature: 0.7,
    seed: 42
  });

  return <div>{text}</div>;
}
```

**Options:**
- `model`: 'openai' | 'mistral' (default: 'openai')
- `seed`: number (for consistent results)
- `temperature`: number (0.0-3.0, controls creativity)
- `system`: string (system instructions)
- `json`: boolean (return JSON format)

### 2. usePollinationsImage
Generate images from text descriptions.

```tsx
import { usePollinationsImage } from '@/hooks';

function MyComponent() {
  const { imageUrl, loading, error } = usePollinationsImage('sunset over mountains', {
    model: 'flux',
    width: 1024,
    height: 1024,
    seed: 42
  });

  return imageUrl ? <img src={imageUrl} alt="Generated" /> : null;
}
```

**Options:**
- `model`: 'flux' | 'turbo' (default: 'flux')
- `width`: number (default: 1024)
- `height`: number (default: 1024)
- `seed`: number (for consistent results)
- `nologo`: boolean (remove watermark, requires account)
- `enhance`: boolean (AI improves prompt)
- `private`: boolean (hide from public feeds)

### 3. usePollinationsChat
Create conversational AI interfaces.

```tsx
import { usePollinationsChat } from '@/hooks';

function ChatComponent() {
  const { messages, loading, error, sendMessage, clearMessages } = usePollinationsChat(
    [{ role: 'system', content: 'You are a helpful assistant.' }],
    {
      model: 'openai',
      temperature: 0.7,
      max_tokens: 500,
      reasoning_effort: 'medium'
    }
  );

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.content}</div>
      ))}
      <button onClick={() => sendMessage('Hello!')}>Send</button>
      <button onClick={clearMessages}>Clear</button>
    </div>
  );
}
```

**Options:**
- `model`: 'openai' | 'mistral' (default: 'openai')
- `temperature`: number (0.0-3.0)
- `max_tokens`: number (max response length)
- `reasoning_effort`: 'minimal' | 'low' | 'medium' | 'high'

## Demo Component

Check out `src/components/pollinations-demo.tsx` for a complete working example of all three hooks.

## Free Tier Limits

- Anonymous: 1 request every 15 seconds
- With token (Seed tier): 1 request every 5 seconds
- Images may include watermarks (use `nologo: true` with paid account)

## Notes

- All hooks handle loading and error states automatically
- The token is included automatically from environment variables
- Hooks re-run when prompt or options change
- Image URLs are generated instantly (no download needed)
