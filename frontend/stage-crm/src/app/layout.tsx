import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImportBsJS from "@/components/importBsJS";
import { SidebarProvider } from "@/ContextPage/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImportBsJS />
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
