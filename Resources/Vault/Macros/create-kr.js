module.exports = async (params) => {
  const { obsidian, quickAddApi, app } = params;
  const { ThoughtSupportSettings } = customJS;

  const TEMPLATES_ROOT = ThoughtSupportSettings.getFromApp(
    "templates_root",
    app
  );
  const TEMPLATE_PAGE_NAME = ThoughtSupportSettings.getFromApp(
    "kr_template_page_name",
    app
  );

  const tag = "#OKR";
  const cache = app.metadataCache;
  const files = app.vault.getMarkdownFiles();
  const files_with_tag = [];
  files.forEach((file) => {
    const file_cache = cache.getFileCache(file);
    const tags = obsidian.getAllTags(file_cache);
    if (!file.path.startsWith(TEMPLATES_ROOT) && tags.includes(tag)) {
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

  const pickedFolder = pickedFile.path.slice(
    0,
    pickedFile.path.lastIndexOf("/")
  );
  const krName = await quickAddApi.inputPrompt("✅ KR Name");

  if (!krName) {
    return;
  }

  const template = {
    path: TEMPLATES_ROOT + "/" + TEMPLATE_PAGE_NAME + ".md",
  };
  await app.vault.copy(template, pickedFolder + "/" + krName + ".md");
  const leaf = app.workspace.getLeaf(true);
  await leaf.openFile(
    {
      path: pickedFolder + "/" + krName + ".md",
      basename: krName,
      extension: "md",
    },
    { active: true }
  );
};
