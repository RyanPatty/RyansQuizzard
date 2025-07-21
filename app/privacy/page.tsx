"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Database, Globe, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-300">How we protect your data and privacy</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Privacy Policy
              </CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                This Privacy Policy describes how RyansQuizzard ("we," "us," or "our") collects, uses, and protects your information when you use our educational platform.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By using RyansQuizzard, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Local Storage Data</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  RyansQuizzard stores your learning data locally on your device, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                  <li>Flashcard sets and their content</li>
                  <li>Quiz questions and answers</li>
                  <li>Learning progress and preferences</li>
                  <li>Theme preferences (dark/light mode)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We may collect anonymous usage analytics to improve our service. This data does not identify individual users.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                <li>To provide and maintain our educational platform</li>
                <li>To improve user experience and functionality</li>
                <li>To analyze usage patterns and optimize performance</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To ensure platform security and prevent abuse</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-red-600 dark:text-red-400" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                <li>Local data storage on your device</li>
                <li>Secure HTTPS connections</li>
                <li>Regular security updates and monitoring</li>
                <li>No transmission of personal data to external servers</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We may use anonymous analytics services to understand how our platform is used and improve our service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                <li>Access your data stored locally on your device</li>
                <li>Export your learning data at any time</li>
                <li>Delete your data by clearing your browser's local storage</li>
                <li>Contact us with privacy concerns</li>
                <li>Opt out of analytics collection</li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                RyansQuizzard is designed for educational use and may be suitable for children under parental supervision. 
                We do not knowingly collect personal information from children under 13 without parental consent.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new Privacy Policy on this page.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> <a href="mailto:mail@mail.com" className="text-blue-600 dark:text-blue-400 hover:underline">mail@mail.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 