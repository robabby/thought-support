module.exports = async (params) => {
  const { ThoughtSupportSettings } = customJS;
  const { obsidian, quickAddApi, app } = params;

  const PROJECTS_ROOT = ThoughtSupportSettings.getFromApp("projects_root", app);
  const INBOX_TAG = ThoughtSupportSettings.getFromApp("inbox_tag", app);

  const cache = app.metadataCache;
  const files = app.vault.getMarkdownFiles();
  const files_with_tag = [];
  files.forEach((file) => {
    const file_cache = cache.getFileCache(file);
    const tags = obsidian.getAllTags(file_cache);
    if (tags.includes(INBOX_TAG)) {
      files_with_tag.push(file);
    }
  });

  const pickedFile = await quickAddApi.suggester(
    (file) => file.basename,
    files_with_tag
  );

  if (!pickedFile) {
    return;
  }

  const taskDescription = await quickAddApi.inputPrompt("✔ Task Description");
  if (!taskDescription) {
    return;
  }
  const newLine = "\n- [ ] " + taskDescription;
  await app.vault.append(pickedFile, newLine);
  // const leaf = app.workspace.getLeaf(true);
  //await leaf.openFile(pickedFile, { active: true });
};
