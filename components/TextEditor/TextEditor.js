"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDebouncedCallback } from "use-debounce";

export default function TextEditor({ onContentChange, content, placeholder }) {
  const [editor, setEditor] = useState(null);

  const debouncedOnContentChange = useDebouncedCallback(() => {
    onContentChange(editor.getContent());
  }, 1000);

  return (
    <>
      <Editor
        id="12345"
        onInit={(evt, editor) => setEditor(editor)}
        onChange={debouncedOnContentChange}
        apiKey="zpjw02qfk4o30xvip1k7gvmqz1h6h2wwhtbpvco6sbhf1cb1"
        init={{
          placeholder: placeholder || null,
          //content_style: "body { font-family: Manrope, sans-serif; }",
          //content_style: "* { margin: 0; }",
          content_style:
            "body { font-family: 'Manrope', sans-serif; } * { margin: 0; }",
          language: "pl",
          language_url: "/langs/pl.js",
          plugins:
            "paste tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontFamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          paste_preprocess: function (plugin, args) {
            // Usuwanie stylów font-family z wklejanego tekstu
            args.content = args.content.replace(/font-family:[^;]+;?/gi, "");
          },
        }}
        initialValue={content || null}
      />
    </>
  );
}
