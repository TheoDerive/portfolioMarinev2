import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Marine Sicaud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
