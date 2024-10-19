import fs from 'fs';
import * as path from 'path';

export default class Liveness {
  private _timer: NodeJS.Timeout | undefined;

  /**
   * Generate path based on meta.url
   * This is made in stupid way, but jest seems to be bugging out.
   * @returns Path to probe.
   */
  private getPath = (): string => {
    const basePath = import.meta.url.split('/');
    return path.join(basePath.splice(2, basePath.length - 1).join('/'), '..', '..', '..', '.livenessProbe');
  };

  private get timer(): NodeJS.Timeout | undefined {
    return this._timer;
  }

  private set timer(value: NodeJS.Timeout | undefined) {
    this._timer = value;
  }

  init(): void {
    this.timer = setInterval(() => {
      this.updateProbe();
    }, 5000);
  }

  close(): void {
    clearInterval(this.timer);
  }

  private updateProbe(): void {
    const location = import.meta.dirname
      ? path.join(import.meta.dirname, '..', '..', '..', '.livenessProbe')
      : this.getPath();

    fs.writeFileSync(location, Date.now().toString());
  }
}
