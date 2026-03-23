import CodeSnippetBlock from '../components/CodeSnippetBlock';
import { Code2, FileCode } from 'lucide-react';

const androidManifestSnippet = `<service
    android:name=".InstaNotificationService"
    android:permission="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE">
    <intent-filter>
        <action android:name="android.service.notification.NotificationListenerService" />
    </intent-filter>
</service>`;

const kotlinServiceSnippet = `class InstaNotificationService : NotificationListenerService() {

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        if (sbn.packageName == "com.instagram.android") {
            val extras = sbn.notification.extras
            val message = extras.getString("android.text") ?: return

            if (!message.contains("You")) {
                sendAutoReply(sbn)
            }
        }
    }

    private fun sendAutoReply(sbn: StatusBarNotification) {
        val reply = "Hey! I'll reply soon 😊"

        val action = sbn.notification.actions?.find {
            it.title.toString().equals("Reply", true)
        }

        val intent = Intent()
        val bundle = Bundle()
        bundle.putCharSequence("android.intent.extra.TEXT", reply)
        intent.putExtras(bundle)

        action?.actionIntent?.send(
            applicationContext, 0, intent
        )
    }
}`;

export default function SnippetViewerPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Instagram Auto-Reply Service
              </h1>
              <p className="text-sm text-muted-foreground">
                Android NotificationListenerService implementation
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Introduction */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              About This Service
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This Android service listens for Instagram notifications and automatically sends
              a reply when you receive a direct message. The service uses the NotificationListenerService
              API to intercept notifications and the notification action intent to send replies.
            </p>
          </div>

          {/* Android Manifest Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                AndroidManifest.xml
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Add this service declaration to your AndroidManifest.xml file inside the{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                &lt;application&gt;
              </code>{' '}
              tag.
            </p>
            <CodeSnippetBlock
              code={androidManifestSnippet}
              language="xml"
              filename="AndroidManifest.xml"
            />
          </section>

          {/* Kotlin Service Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                InstaNotificationService.kt
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Create this Kotlin class in your project. It extends NotificationListenerService
              and implements the auto-reply logic for Instagram notifications.
            </p>
            <CodeSnippetBlock
              code={kotlinServiceSnippet}
              language="kotlin"
              filename="InstaNotificationService.kt"
            />
          </section>

          {/* Usage Notes */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-3 text-base font-semibold text-foreground">
              Important Notes
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  Users must grant notification access permission in Android Settings for this service to work.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  The service filters messages to avoid replying to your own messages (checks if message contains "You").
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  Requires the BIND_NOTIFICATION_LISTENER_SERVICE permission in the manifest.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'unknown-app'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
