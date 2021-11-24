import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeFormatterService {
  private readonly _oneMinuteMS = 60 * 1000;
  private readonly _oneHourMS = 60 * this._oneMinuteMS;
  private readonly _oneDayMS = 24 * this._oneHourMS;
  private readonly _oneMonthMS = 30 * this._oneDayMS;

  public fmt(time: Date): string {
    const currentTime = new Date();
    const passedTimeMS = currentTime.getTime() - time.getTime();

    const dateDiff = currentTime.getDate() - time.getDate();
    const monthDiff = currentTime.getMonth() - time.getMonth();
    const yearDiff = currentTime.getFullYear() - time.getFullYear();

    // For up to last 60 seconds or even the future.
    if (passedTimeMS <= this._oneMinuteMS) {
      return 'Just now';
    }

    // For up to last 60 minutes.
    if (passedTimeMS <= this._oneHourMS) {
      const passedMinutes = Math.ceil(TimeFormatterService._ms2Minutes(passedTimeMS));
      return `${passedMinutes} ${passedMinutes > 1 ? 'minutes ago' : 'minute ago'}`;
    }

    // For up to beginning of Yesterday.
    if (yearDiff === 0 && monthDiff === 0 && dateDiff < 2) {
      // If it is the same day.
      if (dateDiff === 0) {
        return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: 'numeric' });
      }
      // If it is not the same day but only up to 4 hours have passed.
      if (passedTimeMS < 4 * this._oneHourMS) {
        const passedHours = Math.ceil(TimeFormatterService._ms2Hours(passedTimeMS));
        return `${passedHours} ${passedHours > 1 ? 'hours ago' : 'hour ago'}`;
      }

      return 'Yesterday';
    }

    // For up to beginning of last month.
    if (yearDiff === 0 && monthDiff < 2) {
      // If it is the same month or up to 4 days have passed.
      if (monthDiff === 0 || passedTimeMS < 4 * this._oneDayMS) {
        const passedDays = Math.ceil(TimeFormatterService._ms2CalendarDays(passedTimeMS));
        return `${passedDays} ${passedDays > 1 ? 'days ago' : 'day ago'}`;
      }
      return 'Last month';
    }

    // For up to beginning of last year.
    if (yearDiff < 2) {
      // If it is the same year or up to 4 months have passed.
      if (yearDiff === 0 || passedTimeMS < 4 * this._oneMonthMS) {
        const passedMonths = Math.ceil(TimeFormatterService._ms2CalendarMonths(passedTimeMS));
        return `${passedMonths} ${passedMonths > 1 ? 'months ago' : 'month agp'}`;
      }
      return time.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    }

    return time.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  }

  private static _ms2Minutes(ms: number): number {
    return ms / (60 * 1000);
  }

  private static _ms2Hours(ms: number): number {
    return ms / (60 * 60 * 1000);
  }

  private static _ms2CalendarDays(ms: number): number {
    const currentTime = new Date();

    const date = new Date(currentTime.getTime() - ms).getDate();
    return currentTime.getDate() - date;
  }

  private static _ms2CalendarMonths(ms: number): number {
    const currentTime = new Date();

    const month = new Date(currentTime.getTime() - ms).getMonth();
    return currentTime.getMonth() - month;
  }
}
