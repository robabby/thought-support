class CleaningTasks {
  getTodaysTasks(dv) {
    const { ThoughtSupportSettings } = customJS;
    const CLEANING_ROOT = ThoughtSupportSettings.get("cleaning_root", dv);
    function wholeWeekNumber(date) {
      const closestMonday = new Date(date);
      closestMonday.setDate(
        closestMonday.getDate() - ((closestMonday.getDay() || 7) - 1)
      );
      return Math.ceil(closestMonday.getDate() / 7);
    }

    const today = new Date();
    const weekNumberWord = [, "First", "Second", "Third", "Fourth", "Fifth"][
      wholeWeekNumber(today)
    ];
    const page = dv.page(
      CLEANING_ROOT + "/" + dv.date("today").toFormat("EEEE")
    );

    let lastSeenHeader = null;
    const tasksByHeader = { Morning: [], Evening: [] };
    for (const task of page.file.tasks) {
      const header = task.header
        .toString()
        .slice(task.header.toString().indexOf(">") + 2, -2);
      if (!tasksByHeader[header]) tasksByHeader[header] = [];
      tasksByHeader[header].push(task);
    }

    const morningPage = dv.page(CLEANING_ROOT + "/" + "Daily Morning");
    const morningTasks = [...morningPage.file.tasks, ...tasksByHeader.Morning];

    const lessFrequentTasks = [];
    if (tasksByHeader.Weekly) {
      lessFrequentTasks.push(...tasksByHeader.Weekly);
    }
    if (tasksByHeader[`${weekNumberWord} Week of the Month`]) {
      lessFrequentTasks.push(
        ...tasksByHeader[`${weekNumberWord} Week of the Month`]
      );
    }
    if (today.getMonth() % 3 === 0) {
      if (tasksByHeader[`${weekNumberWord} Week of the Month Quarterly`]) {
        lessFrequentTasks.push(
          ...tasksByHeader[`${weekNumberWord} Week of the Month Quarterly`]
        );
      }
    }

    const eveningPage = dv.page(CLEANING_ROOT + "/" + "Daily Evening");
    const eveningTasks = [...eveningPage.file.tasks, ...tasksByHeader.Evening];

    return { morningTasks, lessFrequentTasks, eveningTasks };
  }

  displayTodaysTasks(dv) {
    const { morningTasks, lessFrequentTasks, eveningTasks } =
      this.getTodaysTasks(dv);
    if (morningTasks.length > 0) {
      dv.header(2, "Morning Tasks");
      dv.taskList(morningTasks, false);
    }
    if (lessFrequentTasks.length > 0) {
      dv.header(2, "Less Frequent Tasks");
      dv.taskList(lessFrequentTasks, false);
    }
    if (eveningTasks.length > 0) {
      dv.header(2, "Evening Tasks");
      dv.taskList(eveningTasks, false);
    }
  }

  todaysIncompleteCount(dv, luxon) {
    const now = dv.date("now");
    const lists = this.getTodaysTasks(dv);
    let total = 0;
    let active = 0;
    for (const list of Object.values(lists)) {
      for (const task of list) {
        const page = dv.page(task.path);
        if (now > luxon.DateTime.fromFormat(page.start || "00:00", "HH:mm")) {
          active += task.fullyCompleted ? 0 : 1;
        }
        total += task.fullyCompleted ? 0 : 1;
      }
    }
    return {
      totalIncompleteTaskCount: total,
      activeIncompleteTaskCount: active,
    };
  }
}
