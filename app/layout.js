import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Marine Sicaud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
        />
      </head>
      <body>
        <Cursor />
        <div className="eyes-confort"></div>
        {children}
      </body>
    </html>
  );
}
