import "./globals.css";

export const metadata = {
  title: "Guy Nonkala | Alternant Data Scientist",
  description:
    "Portfolio de Guy Nonkala, etudiant en Master Data Science & Strategie, disponible pour une alternance Data Scientist.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
