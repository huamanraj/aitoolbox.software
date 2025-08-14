import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Product Description Generator | AI Toolbox',
  description: 'Create engaging product description with AI assistance.',
  openGraph: {
    title: 'AI Product Description Generator | AI Toolbox',
    description: 'Create engaging product description with AI assistance.',
    type: 'website',
  },
};

export default function ProductDescriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 