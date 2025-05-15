// app/layout.tsx
export const metadata = {
  title: 'SecurityPlanner',
  description: 'Planification des agents de sécurité',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}