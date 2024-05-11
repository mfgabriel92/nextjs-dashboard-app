import { Lusitana } from "next/font/google";
import "./globals.css";

const lusitana = Lusitana({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased`}>{children}</body>
    </html>
  );
}
