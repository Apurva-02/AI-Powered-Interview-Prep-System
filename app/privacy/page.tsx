import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                OneselfAI ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website and
                use our services.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Personal Information:</strong> We collect information you provide directly, such as your name,
                  email address, phone number, and account credentials.
                </p>
                <p>
                  <strong>Interview Data:</strong> We collect video, audio, and text data from your interview sessions
                  to provide feedback and analysis.
                </p>
                <p>
                  <strong>Usage Data:</strong> We automatically collect information about your interactions with our
                  platform, including timestamps, features used, and performance metrics.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>To provide and improve our services</li>
                <li>To analyze your interview performance</li>
                <li>To send you updates and notifications</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and ensure security</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit
                and at rest.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to access, correct, or delete your personal information. You can also opt-out of
                certain communications. To exercise these rights, please contact us at
                info.oneselftechnologies@gmail.com.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>Email: info.oneselftechnologies@gmail.com</p>
                <p>Phone: +91 8010212475 / +91 8007029012</p>
                <p>Company: Oneself Technologies</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
