class ThoughtSupportSettings {
  SETTINGS_TAGS = ["#Settings", "#Thought-Support"];

  getFromApp(key, app) {
    if (typeof app === "undefined") {
      throw new Error(
        "You need to pass app as the second argument to ThoughtSupportSettings.getFromApp"
      );
    }
    for (const [path, pageMeta] of app.plugins.plugins["dataview"].index
      .pages) {
      if (this.SETTINGS_TAGS.every((tag) => pageMeta.tags.has(tag))) {
        if (typeof pageMeta.frontmatter[key] !== "undefined") {
          return pageMeta.frontmatter[key];
        }
      }
    }
    throw new Error("No such setting: " + key);
  }

  get(key, dv) {
    if (typeof dv === "undefined") {
      throw new Error(
        "You need to pass dv as the second argument to ThoughtSupportSettings.get"
      );
    }
    const settingsPages = dv.pages(this.SETTINGS_TAGS.join(" and "));
    for (const page of settingsPages) {
      if (typeof page.file.frontmatter[key] !== "undefined") {
        return page.file.frontmatter[key];
      }
    }
    throw new Error("No such setting: " + key);
  }
}
