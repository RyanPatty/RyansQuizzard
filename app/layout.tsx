import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata: Metadata = {
  title: "RyansQuizzard - Offline Flashcards & Quizzes",
  description: "Your favorite flashcard and quiz companion",
  generator: "RyansQuizzard",
  authors: [{ name: "Ryan O'Connor" }],
  keywords: "flashcards, quizzes, learning, education, study tools, Ryan O'Connor",
  creator: "Ryan O'Connor",
  icons: {
    icon: [
      { url: '/greenLogo.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body>
        <ThemeProvider defaultTheme="system" storageKey="ryans-quiz-maker-theme">
          {children}
          <PWAInstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  )
}
