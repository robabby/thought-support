class OKR {
  okr(dv) {
    dv.header(2, "Key Results");
    dv.list(dv.pages('#kr and "' + dv.current().file.folder + '"').file.link);
  }

  kr(dv) {
    const successMetricCurrent = dv.current()["success metric"].current;
    const successMetricObjective = dv.current()["success metric"].objective;
    const successMetricPercentage = Math.floor(
      (successMetricCurrent / successMetricObjective) * 100
    );
    dv.header(
      3,
      "(Success Metric): *" + dv.current()["success metric"].description + "*"
    );
    dv.paragraph(
      "⚪".repeat(Math.floor(successMetricPercentage / 10)) +
        "⚫".repeat(10 - Math.floor(successMetricPercentage / 10)) +
        " (" +
        successMetricPercentage +
        "%)"
    );

    // Warning metric indicator
    const warningMetricCurrent = dv.current()["warning metric"].current;
    const warningMetricBelow = dv.current()["warning metric"].below;
    const warningMetricAbove = dv.current()["warning metric"].above;

    dv.header(
      3,
      "(Warning Metric): *" + dv.current()["warning metric"].description + "*"
    );
    if (warningMetricCurrent < warningMetricBelow) {
      dv.paragraph(
        "*" +
          dv.current()["warning metric"].description +
          "* is at " +
          warningMetricCurrent +
          " which is below the expected range by " +
          (warningMetricBelow - warningMetricCurrent) +
          "."
      );
    } else if (warningMetricCurrent > warningMetricAbove) {
      dv.paragraph(
        "*" +
          dv.current()["warning metric"].description +
          "* is at " +
          warningMetricCurrent +
          " which is above the expected range by " +
          (warningMetricCurrent - warningMetricAbove) +
          "."
      );
    } else {
      dv.paragraph(
        "*" +
          dv.current()["warning metric"].description +
          "* is at " +
          warningMetricCurrent +
          " which is within the expected range."
      );
    }
    dv.header(3, "Deadline");
    dv.paragraph(
      "The " +
        dv.date(dv.current().deadline).toFormat("yyyy-LL-dd") +
        " deadline is " +
        Math.floor(dv.date(dv.current().deadline).diffNow(["days"]).days) +
        " day(s) away."
    );
  }
}
