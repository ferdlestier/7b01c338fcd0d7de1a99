import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { extractManifestInfo } from "@/lib/manifestValidator";

interface ManifestBuilderProps {
  content: string;
  onChange: (content: string) => void;
}

export function ManifestBuilder({ content, onChange }: ManifestBuilderProps) {
  const [packageName, setPackageName] = useState("");
  const [appLabel, setAppLabel] = useState("@string/app_name");
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const info = extractManifestInfo(content);
    if (info) {
      setPackageName(info.packageName);
      setActivities(info.activities);
      setPermissions(info.permissions);
    }
  }, [content]);

  const updateManifest = (
    pkg: string,
    label: string,
    acts: string[],
    perms: string[]
  ) => {
    const permissionTags = perms
      .map((p) => `    <uses-permission android:name="${p}" />`)
      .join('\n');

    const activityTags = acts
      .map((a, index) => {
        const isMain = index === 0;
        return `        <activity
            android:name="${a}"
            android:exported="${isMain ? 'true' : 'false'}">${
          isMain
            ? '\n            <intent-filter>\n                <action android:name="android.intent.action.MAIN" />\n                <category android:name="android.intent.category.LAUNCHER" />\n            </intent-filter>'
            : ''
        }
        </activity>`;
      })
      .join('\n\n');

    const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${pkg}">

${permissionTags}

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="${label}"
        android:theme="@style/AppTheme">
        
${activityTags}
        
    </application>

</manifest>`;

    onChange(manifest);
  };

  const handlePackageChange = (value: string) => {
    setPackageName(value);
    updateManifest(value, appLabel, activities, permissions);
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      const updated = [...activities, newActivity.trim()];
      setActivities(updated);
      updateManifest(packageName, appLabel, updated, permissions);
      setNewActivity("");
    }
  };

  const handleRemoveActivity = (index: number) => {
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
    updateManifest(packageName, appLabel, updated, permissions);
  };

  const handleRemovePermission = (index: number) => {
    const updated = permissions.filter((_, i) => i !== index);
    setPermissions(updated);
    updateManifest(packageName, appLabel, activities, updated);
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 pr-4 pb-4">
        <div className="space-y-2">
          <Label htmlFor="package">Package Name</Label>
          <Input
            id="package"
            value={packageName}
            onChange={(e) => handlePackageChange(e.target.value)}
            placeholder="com.example.myapp"
          />
          <p className="text-xs text-muted-foreground">
            Must follow Java package naming conventions (e.g., com.company.app)
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="appLabel">Application Label</Label>
          <Input
            id="appLabel"
            value={appLabel}
            onChange={(e) => setAppLabel(e.target.value)}
            placeholder="@string/app_name"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <Label>Permissions</Label>
          {permissions.length === 0 ? (
            <Card className="p-4 text-center text-sm text-muted-foreground">
              No permissions added. Use the Permissions tab to add them.
            </Card>
          ) : (
            <div className="space-y-2">
              {permissions.map((perm, index) => (
                <Card key={index} className="p-3 flex items-center justify-between gap-2">
                  <code className="text-xs flex-1 break-all">{perm}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemovePermission(index)}
                  >
                    <Trash size={16} className="text-destructive" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <Label>Activities</Label>
          <div className="flex gap-2">
            <Input
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder=".MainActivity"
              onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
            />
            <Button onClick={handleAddActivity}>
              <Plus size={16} />
            </Button>
          </div>

          {activities.length === 0 ? (
            <Card className="p-4 text-center text-sm text-muted-foreground">
              No activities defined. Add at least one activity.
            </Card>
          ) : (
            <div className="space-y-2">
              {activities.map((activity, index) => (
                <Card key={index} className="p-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <code className="text-xs">{activity}</code>
                    {index === 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Launcher
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveActivity(index)}
                  >
                    <Trash size={16} className="text-destructive" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
