---
tags:
  - Dashboard
  - Thought-Support
  - Unclassified
reviewed_for_repository: 2022-10-28
---
> [!INFO]
> Please read [Help Home](Resources/Thought%20Support%20Help/Help%20Home) to get started. You can delete this callout block once done with it.

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { ThoughtSupportSettings } = customJS;
const ownerFirstName = ThoughtSupportSettings.get("owner_first_name", dv);

dv.header(
  1,
  "It's " +
    dv
      .date("now")
      .toLocaleString({
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }) +
    "."
);
const hour = dv.date("now").toFormat("H");
const hourWord =
  hour > 16
    ? hour < 20
      ? "Evening"
      : "Night"
    : hour < 4
    ? "Night"
    : hour < 12
    ? "Morning"
    : "Afternoon";
dv.header(2, `Good ${hourWord}, ${ownerFirstName}.`);
```

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { RandomExcerpt } = customJS;
dv.paragraph(RandomExcerpt.get(dv));
```

Welcome to _Thought Support_. This vault will be more organised and useful than the last ones. Every page has to have at least one tag.

# Upcoming Weather

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { ThoughtSupportSettings } = customJS;
const LATITUDE = ThoughtSupportSettings.get("weather_latitude", dv);
const LONGITUDE = ThoughtSupportSettings.get("weather_longitude", dv);
const API_KEY = ThoughtSupportSettings.get("weather_api_key", dv);

const MPS_TO_MPH = 2.236936;
const forecast = await requestUrl({
  url:
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    LATITUDE +
    "&lon=" +
    LONGITUDE +
    "&appid=" +
    API_KEY +
    "&units=metric&cnt=4",
});
dv.header(2, "*For " + forecast.json.city.name + "*");
dv.table(
  [
    "Date/Time",
    "Icon",
    "Description",
    "Temperature (°C)",
    "Wind Speed (mph)",
    "Wind Gust Speed (mph)",
    "Visibility (metres)",
  ],
  forecast.json.list.map((row) => [
    luxon.DateTime.fromSeconds(row.dt).toLocaleString(
      luxon.DateTime.DATETIME_SHORT
    ),
    "![|50](" +
      "http://openweathermap.org/img/wn/" +
      row.weather[0].icon +
      "@2x.png" +
      ")",
    row.weather[0].description,
    row.main.temp + "°",
    Math.round(row.wind.speed * MPS_TO_MPH * 100) / 100,
    Math.round(row.wind.gust * MPS_TO_MPH * 100) / 100,
    row.visibility,
  ])
);
```

# My Routines

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { ThoughtSupportSettings, CleaningTasks } = customJS;
const ROUTINES_ROOT = ThoughtSupportSettings.get("routines_root", dv);
const TODAY_CLEANING_PAGE_PATH = ThoughtSupportSettings.get(
  "today_cleaning_page_path",
  dv
);
const MORNING_ROUTINE_FILE_NAME = ThoughtSupportSettings.get(
  "morning_routine_page_name",
  dv
);
const EVENING_ROUTINE_FILE_NAME = ThoughtSupportSettings.get(
  "evening_routine_page_name",
  dv
);
const morningRoutinePage = dv.page(
  ROUTINES_ROOT + "/" + MORNING_ROUTINE_FILE_NAME
);
const eveningRoutinePage = dv.page(
  ROUTINES_ROOT + "/" + EVENING_ROUTINE_FILE_NAME
);

const { totalIncompleteTaskCount, activeIncompleteTaskCount } =
  CleaningTasks.todaysIncompleteCount(dv, luxon);
dv.table(
  ["Routine", "Incomplete Tasks"],
  [
    [
      "🌄 " + morningRoutinePage.file.link,
      morningRoutinePage.file.tasks.values.reduce(
        (count, task) => count + (task.fullyCompleted ? 0 : 1),
        0
      ),
    ],
    [
      "🧹 [Cleaning for " +
        dv.date("today").toFormat("EEEE") +
        "](" +
        dv
          .pages('"' + TODAY_CLEANING_PAGE_PATH + '"')[0]
          .file.path.toString() +
        ")",
      "Total: " +
        totalIncompleteTaskCount +
        ", Active: " +
        activeIncompleteTaskCount +
        ".",
    ],
    [
      "🌆 " + eveningRoutinePage.file.link,
      eveningRoutinePage.file.tasks.values.reduce(
        (count, task) => count + (task.fullyCompleted ? 0 : 1),
        0
      ),
    ],
  ]
);
```

# My Inboxes

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { ThoughtSupportSettings } = customJS;
const tag = ThoughtSupportSettings.get("inbox_tag", dv);
dv.table(
  ["Inbox", "Incomplete Tasks"],
  dv
    .pages("#Inbox")
    .map((p) => [
      p.file.link,
      p.file.tasks.where((t) => !t.fullyCompleted).length,
    ])
);
```

# My Flagged Tasks

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { ThoughtSupportSettings } = customJS;
const inboxTag = ThoughtSupportSettings.get("inbox_tag", dv);
dv.taskList(
  dv
    .pages(inboxTag)
    .file.tasks.where((task) => task.tags.find((tag) => tag === "#Flagged"))
);
```

# My Goals

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { ThoughtSupportSettings } = customJS;
const templatesRoot = ThoughtSupportSettings.get("templates_root", dv);
dv.table(
  ["OKR", "KR(s)"],
  dv
    .pages('#OKR and !"' + templatesRoot + '"')
    .map((p) => [
      p.file.link,
      dv.pages('#KR and "' + p.file.folder + '"').length,
    ])
);
```

# My Key Results

```dataviewjs
// Begin code to ensure customJS is loaded.
// This became necessary at some point.
let customJSAttempts = 0;
const maxCustomJSAttempts = 10;
const customJSAttemptDelay = 1000;
let gotCustomJS = false;
while (customJSAttempts < maxCustomJSAttempts) {
  try {
    const { ThoughtSupportSettings } = customJS;
    gotCustomJS = true;
    break;
  } catch (error) {
    if (error.message !== "customJS is not defined") {
      throw error;
    }
  }
  await new Promise((resolve) =>
    setTimeout(() => resolve(), customJSAttemptDelay)
  );
  customJSAttempts++;
}
if (!gotCustomJS) {
  throw new Error(
    "Failed to load customJS plugin after " + customJSAttempts + " attempt(s)."
  );
}
// End code to ensure customJS is loaded. customJS is now available.

const { ThoughtSupportSettings } = customJS;
const TEMPLATES_ROOT = ThoughtSupportSettings.get("templates_root", dv);
const pages = dv.pages('#KR and !"' + TEMPLATES_ROOT + '"');

dv.table(
  ["OKR", "KR", "Deadline", "Scheduled?", "Warning?"],
  pages
    .sort((p) => p.deadline, "asc")
    .map((p) => [
      dv.pages('#okr and "' + p.file.folder + '"')[0].file.link,
      p.file.link,
      p.deadline,
      typeof p.scheduled === "undefined" ? "N/A" : p.scheduled ? "Yes" : "No",
      p["warning metric"].current >= p["warning metric"].below &&
      p["warning metric"].current <= p["warning metric"].above
        ? "No"
        : "Yes",
    ])
);
```

# My North Star

![[North Star]]
