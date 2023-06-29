const ONE_HOUR_IN_MINUTES = 60;

// Don't
namespace Ask {
  class Watch {
    constructor(private timeInMinutes: number) {}

    getTime = () => this.timeInMinutes;

    setTime = (timeInMinutes: number) => {
      this.timeInMinutes = timeInMinutes;
    };
  }

  test("Switch to summer time", () => {
    const watch = new Watch(17 * ONE_HOUR_IN_MINUTES);
    watch.setTime(watch.getTime() + ONE_HOUR_IN_MINUTES);
    expect(watch.getTime()).toEqual(18 * ONE_HOUR_IN_MINUTES);
  });
}

// Do
namespace Tell {
  class Watch {
    constructor(private timeInMinutes: number) {}

    whatTimeIsIt = (): string => {
      const minutes = this.timeInMinutes % ONE_HOUR_IN_MINUTES;
      const hours = (this.timeInMinutes - minutes) / ONE_HOUR_IN_MINUTES;
      return `Il est ${hours} heure(s) et ${minutes} minute(s).`;
    };

    switchToSummerTime = () => {
      this.timeInMinutes += ONE_HOUR_IN_MINUTES;
    };

    dangerouslySetBackOnTime = (timeInMinutes: number) => {
      this.timeInMinutes = timeInMinutes;
    };
  }

  test("Switch to summer time", () => {
    const watch = new Watch(17 * ONE_HOUR_IN_MINUTES);
    watch.switchToSummerTime();
    expect(watch.whatTimeIsIt()).toEqual("Il est 18 heure(s) et 0 minute(s).");
  });

  test("Set a watch back", () => {
    const watch = new Watch(17 * ONE_HOUR_IN_MINUTES);
    watch.dangerouslySetBackOnTime(17 * ONE_HOUR_IN_MINUTES + 1);
    expect(watch.whatTimeIsIt()).toEqual("Il est 17 heure(s) et 1 minute(s).");
  });
}
