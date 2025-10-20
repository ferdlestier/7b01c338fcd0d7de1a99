import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, MagnifyingGlass, ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";

interface Permission {
  name: string;
  category: string;
  description: string;
  protectionLevel: string;
}

interface PermissionExplorerProps {
  permissions: Permission[];
  onAddPermission: (permissionName: string) => void;
}

export function PermissionExplorer({ permissions, onAddPermission }: PermissionExplorerProps) {
  const [search, setSearch] = useState("");

  const filteredPermissions = permissions.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(permissions.map((p) => p.category)));

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative">
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />
        <Input
          placeholder="Search permissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge key={cat} variant="outline">
            {cat}
          </Badge>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-4">
          {filteredPermissions.map((permission) => (
            <Card key={permission.name} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      weight="fill"
                      className={
                        permission.protectionLevel === "dangerous"
                          ? "text-destructive"
                          : "text-primary"
                      }
                    />
                    <code className="text-xs font-medium text-secondary">
                      {permission.name}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">{permission.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {permission.category}
                    </Badge>
                    <Badge
                      variant={permission.protectionLevel === "dangerous" ? "destructive" : "outline"}
                      className="text-xs"
                    >
                      {permission.protectionLevel}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onAddPermission(permission.name)}
                  className="shrink-0"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
