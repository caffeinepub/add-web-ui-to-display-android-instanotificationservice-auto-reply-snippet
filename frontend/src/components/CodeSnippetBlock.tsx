import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeSnippetBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeSnippetBlock({ code, language, filename }: CodeSnippetBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-code-block shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="font-mono text-xs font-medium text-foreground">
              {filename}
            </span>
          )}
          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4">
          <code className="block font-mono text-sm leading-relaxed text-foreground">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
