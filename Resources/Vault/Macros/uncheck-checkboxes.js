module.exports = async (params) => {
  const { obsidian, quickAddApi, app } = params;
  const view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
  const editor = view.editor;

  const documentText = editor.getValue();
  const searchRegex = new RegExp(/^([-*] )\[[Xx]\]/, "gm");
  const match = documentText.match(searchRegex);
  if (match) {
    editor.setValue(documentText.replace(searchRegex, "- [ ]"));
  } else {
  }
};
