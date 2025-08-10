"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true, HTMLAttributes: { rel: "noreferrer noopener" } }),
      Image,
      Placeholder.configure({ placeholder: "Write your post..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none dark:prose-invert prose-neutral min-h-[300px] focus:outline-none",
      },
    },
  });

  return (
    <div className="space-y-2">
      <Card className="p-2">
        <div className="flex flex-wrap gap-1 p-1">
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleBold().run()} disabled={!editor}>Bold</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={!editor}>Italic</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleStrike().run()} disabled={!editor}>Strike</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} disabled={!editor}>H2</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} disabled={!editor}>H3</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={!editor}>Bullets</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleOrderedList().run()} disabled={!editor}>Numbers</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().toggleBlockquote().run()} disabled={!editor}>Quote</Button>
          <Button variant="outline" size="sm" onClick={() => editor?.chain().focus().setHorizontalRule().run()} disabled={!editor}>HR</Button>
        </div>
        <div className="p-2">
          <EditorContent editor={editor} />
        </div>
      </Card>
    </div>
  );
}


