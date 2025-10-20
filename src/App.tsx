import { useState, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Code, Layout, ShieldCheck, ArrowClockwise } from "@phosphor-icons/react";
import { ManifestEditor } from "@/components/ManifestEditor";
import { ManifestBuilder } from "@/components/ManifestBuilder";
import { PermissionExplorer } from "@/components/PermissionExplorer";
import { ProjectTree } from "@/components/ProjectTree";
import { DEFAULT_MANIFEST, ANDROID_PERMISSIONS, PROJECT_STRUCTURE } from "@/lib/constants";
import { validateManifest, ValidationResult } from "@/lib/manifestValidator";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

function App() {
  const [manifestContent, setManifestContent] = useKV("manifest-content", DEFAULT_MANIFEST);
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, errors: [] });
  const [activeTab, setActiveTab] = useState("editor");
  const isMobile = useIsMobile();

  useEffect(() => {
    const result = validateManifest(manifestContent || DEFAULT_MANIFEST);
    setValidation(result);
  }, [manifestContent]);

  const handleReset = () => {
    setManifestContent(DEFAULT_MANIFEST);
    toast.success("Manifest reset to default template");
  };

  const handleAddPermission = (permissionName: string) => {
    const content = manifestContent || DEFAULT_MANIFEST;
    if (content.includes(permissionName)) {
      toast.info("Permission already exists in manifest");
      return;
    }

    const lines = content.split('\n');
    const manifestLineIndex = lines.findIndex(line => line.includes('<manifest'));
    
    if (manifestLineIndex === -1) {
      toast.error("Could not find manifest element");
      return;
    }

    let insertIndex = manifestLineIndex + 1;
    while (insertIndex < lines.length && lines[insertIndex].trim().startsWith('package=')) {
      insertIndex++;
    }

    while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
      insertIndex++;
    }

    const permissionLine = `    <uses-permission android:name="${permissionName}" />`;
    
    lines.splice(insertIndex, 0, permissionLine);
    setManifestContent(lines.join('\n'));
    toast.success("Permission added to manifest");
    setActiveTab("editor");
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Android Manifest Studio</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Interactive AndroidManifest.xml editor and learning tool
              </p>
            </div>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <ArrowClockwise size={16} />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Project Structure</CardTitle>
                <CardDescription>Standard Android Gradle project layout</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ProjectTree structure={PROJECT_STRUCTURE} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <CardHeader className="pb-3">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="editor" className="gap-2">
                      <Code size={16} />
                      {!isMobile && "Editor"}
                    </TabsTrigger>
                    <TabsTrigger value="builder" className="gap-2">
                      <Layout size={16} />
                      {!isMobile && "Builder"}
                    </TabsTrigger>
                    <TabsTrigger value="permissions" className="gap-2">
                      <ShieldCheck size={16} />
                      {!isMobile && "Permissions"}
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <Separator />

                <CardContent className="flex-1 overflow-hidden pt-6">
                  <TabsContent value="editor" className="h-full mt-0">
                    <ManifestEditor
                      content={manifestContent || DEFAULT_MANIFEST}
                      onChange={setManifestContent}
                      validation={validation}
                    />
                  </TabsContent>

                  <TabsContent value="builder" className="h-full mt-0">
                    <ManifestBuilder
                      content={manifestContent || DEFAULT_MANIFEST}
                      onChange={setManifestContent}
                    />
                  </TabsContent>

                  <TabsContent value="permissions" className="h-full mt-0">
                    <PermissionExplorer
                      permissions={ANDROID_PERMISSIONS}
                      onAddPermission={handleAddPermission}
                    />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;