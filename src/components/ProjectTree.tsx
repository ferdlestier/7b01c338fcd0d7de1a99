import { Folder, FolderOpen, FileCode } from "@phosphor-icons/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  highlight?: boolean;
  children?: FileNode[];
}

interface FileTreeItemProps {
  node: FileNode;
  depth?: number;
}

function FileTreeItem({ node, depth = 0 }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(depth < 2);

  if (node.type === 'file') {
    return (
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded transition-colors ${
          node.highlight
            ? 'bg-accent text-accent-foreground font-medium'
            : 'text-foreground hover:bg-muted'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <FileCode size={16} weight={node.highlight ? 'fill' : 'regular'} />
        <span className="text-sm">{node.name}</span>
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted w-full text-left transition-colors"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isOpen ? (
          <FolderOpen size={16} weight="fill" className="text-primary" />
        ) : (
          <Folder size={16} weight="fill" className="text-muted-foreground" />
        )}
        <span className="text-sm font-medium">{node.name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {node.children?.map((child, index) => (
          <FileTreeItem key={`${child.name}-${index}`} node={child} depth={depth + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface ProjectTreeProps {
  structure: FileNode[];
}

export function ProjectTree({ structure }: ProjectTreeProps) {
  return (
    <ScrollArea className="h-full">
      <div className="py-2">
        {structure.map((node, index) => (
          <FileTreeItem key={`${node.name}-${index}`} node={node} />
        ))}
      </div>
    </ScrollArea>
  );
}
