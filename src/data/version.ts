import versionData from './version.json';

interface IVersionData {
  major: number;
  minor: number;
  revision: number;
}

class Version {
  #data: IVersionData;

  get major(): number {
    return this.#data.major;
  }

  get minor(): number {
    return this.#data.minor;
  }

  get revision(): number {
    return this.#data.revision;
  }

  toString(): string {
    return `v${this.major}.${this.minor}.${this.revision}`;
  }

  constructor(data: IVersionData) {
    this.#data = data;
    this.toString = this.toString.bind(this);

    Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this)))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, descriptor]) => typeof descriptor.get === 'function')
      .forEach(([key, descriptor]) => {
        descriptor.get = descriptor.get?.bind(this);
        descriptor.set = descriptor.set?.bind(this);

        Object.defineProperty(this, key, descriptor);
      });
  }
}

const APP_VERSION = new Version(versionData);
export default APP_VERSION;
