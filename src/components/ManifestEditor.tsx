import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Warning } from "@phosphor-icons/react";
import { ValidationResult } from "@/lib/manifestValidator";

interface ManifestEditorProps {
  content: string;
  onChange: (content: string) => void;
  validation: ValidationResult;
}

export function ManifestEditor({ content, onChange, validation }: ManifestEditorProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium uppercase text-muted-foreground">
            AndroidManifest.xml
          </h3>
          {validation.isValid ? (
            <Badge variant="outline" className="gap-1 bg-accent/10 text-accent-foreground border-accent">
              <CheckCircle size={12} weight="fill" />
              Valid
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1">
              <Warning size={12} weight="fill" />
              {validation.errors.length} Error{validation.errors.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {validation.errors.length > 0 && (
        <Alert variant={validation.errors.some(e => e.type === 'error') ? "destructive" : "default"}>
          <AlertDescription>
            <ul className="space-y-1 text-sm">
              {validation.errors.map((error, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Warning size={16} weight="fill" className="shrink-0 mt-0.5" />
                  <span>{error.message}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card className="flex-1 overflow-hidden bg-secondary/5">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="code-editor h-full min-h-[400px] resize-none font-mono text-xs leading-relaxed border-0 focus-visible:ring-0"
          placeholder="Enter AndroidManifest.xml content..."
        />
      </Card>
    </div>
  );
}
