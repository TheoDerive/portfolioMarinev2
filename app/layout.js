import Cursor from "@/components/Cursor";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Marine test Sicaud",
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
        {children}
      </body>
    </html>
  );
}
