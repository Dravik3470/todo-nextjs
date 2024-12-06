import './globals.css';

export const metadata = {
  title: 'To-Do App',
  description: 'A simple to-do app with dark mode',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-primary text-white">{children}</body>
    </html>
  );
}
