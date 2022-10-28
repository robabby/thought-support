class RandomExcerpt {
  get(dv) {
    const { ThoughtSupportSettings } = customJS;
    const EXCERPTS_ROOT = ThoughtSupportSettings.get("excerpts_root", dv);
    const pages = dv.pages('"' + EXCERPTS_ROOT + '"');
    const page = pages[Math.floor(Math.random() * pages.length)];
    if (page.file.lists.values.length < 1) {
      return "No excerpts found.";
    }
    const tagRemovingRe = /#[^# ]+/g;
    const randomItem =
      page.file.lists[Math.floor(Math.random() * page.file.lists.length)];
    const source =
      randomItem.header.subpath ||
      randomItem.path.replace(/^(?:[^/]+\/)*([^.]+)(?:\.[^.]+)?$/, "$1");
    const noTagsText = randomItem.text.replace(/ *#[^# ]+/g, "");
    return (
      noTagsText +
      "\n\n" +
      randomItem.tags
        .concat((page.tags || []).map((tag) => "#" + tag))
        .join(" ") +
      "⁠\n\n  —* **" +
      source +
      "** by " +
      (page.author || "Unknown") +
      "*"
    );
  }
}
