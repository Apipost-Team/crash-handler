import { debounce, isArray } from 'lodash';
import { ELEMENT_BASE_STYLE, INIT_DELAY_SECONDS, MONITOR_POINTS } from './constant';

type ObserveListener = (status: boolean) => void;

class CrashHandler {
  private readonly POINT_CLASS_NAME_PREFIX = 'MONITOR_POINT';

  private observeHandlers:ObserveListener[] = [];

  private pointElements:Element[]|null = null;

  // 清除所有采样点
  private clearPoints(): void {
    const prePointElements = document.querySelectorAll(`.${this.POINT_CLASS_NAME_PREFIX}`);
    prePointElements.forEach((element) => {
      element.remove();
    });
  }

  private emitHandler(pointsVisible) {
    let isWhiteScreen = false;
    Object.values(pointsVisible).forEach((visible) => {
      if (visible === false) {
        isWhiteScreen = true;
      }
    });
    this.observeHandlers.forEach((callBackFn) => {
      callBackFn(isWhiteScreen);
    });
  }

  private emitHandlerDebounce = debounce(this.emitHandler, 1000);

  private bindElementVisibleHandler(pointElements: Element[]): void {
    pointElements.forEach((element, index) => {
      new IntersectionObserver(
        ([change]) => {
          const pointsVisible = {};
          pointsVisible[`${index}`] = change.isVisible;
          this.emitHandlerDebounce(pointsVisible);
        },
        {
          threshold: 1,
          delay: 1000,
          trackVisibility: true,
        }
      ).observe(element);
    });
  }

  constructor() {
    this.clearPoints();
    const elements:Element[] = [];
    MONITOR_POINTS.forEach((point) => {
      const element = document.createElement('div');
      element.className = this.POINT_CLASS_NAME_PREFIX;
      const monitorPoint = { ...ELEMENT_BASE_STYLE, ...point };
      Object.entries(monitorPoint).forEach(([key, value]) => {
        element.style[key] = value;
      });
      elements.push(element);
      document.body.appendChild(element);
    });
    this.pointElements = elements;
    setTimeout(() => {
      this.bindElementVisibleHandler(elements);
    }, INIT_DELAY_SECONDS);
  }

  subscribe(handler: ObserveListener): any {
    this.observeHandlers.push(handler);
    return {
      unsubscribe: () => {
        const deleteIndex = this.observeHandlers.findIndex((item) => item === handler);
        this.observeHandlers.splice(deleteIndex, 1);
      },
    };
  }

  dispose(): void {
    if (isArray(this.pointElements)) {
      this.pointElements.forEach((element) => {
        element.remove();
      });
    }
    this.pointElements = null;
  }
}

export default CrashHandler;
