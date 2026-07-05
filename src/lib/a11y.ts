import axe from "axe-core";

/**
 * Runs an axe accessibility audit on the current DOM.
 * If violations are found, it will log them and throw an error as requested.
 */
export function runA11yCheck() {
  if (typeof window === "undefined") return;

  axe
    .run()
    .then((results) => {
      if (results.violations.length) {
        console.group("♿ Accessibility Violations Found");
        results.violations.forEach((violation) => {
          console.error(`${violation.id}: ${violation.help}`);
          console.log("Details:", violation.nodes);
        });
        console.groupEnd();
        throw new Error(`Accessibility issues found: ${results.violations.length} violations`);
      } else {
        console.log("♿ Axe accessibility checks passed successfully.");
      }
    })
    .catch((err) => {
      console.error("Something bad happened during A11y checks:", err.message);
    });
}
