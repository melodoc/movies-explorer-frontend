export class DocumentBreakpoints {
  static mobileBreakpoint = 360;
  static tabletBreakpoint = 767;
  static desktopBreakpoint = 1279;

  static getIsInValue(value) {
    return window.innerWidth < value;
  }

  static getIsMobile() {
    return (
      window.innerWidth >= this.mobileBreakpoint &&
      window.innerWidth < this.tabletBreakpoint
    );
  }

  static getIsTablet() {
    return (
      window.innerWidth >= this.tabletBreakpoint &&
      window.innerWidth < this.desktopBreakpoint
    );
  }

  static getIsSmallMobile() {
    return window.innerWidth <= this.mobileBreakpoint;
  }

  static getIsDesktop() {
    return window.innerWidth >= this.desktopBreakpoint;
  }

  static getIsMobileInValue(value) {
    return this.tabletBreakpoint + 1 >= value;
  }
}
