import cx from 'classnames';
import React, { Component, HTMLAttributes } from 'react';
import type { EventMittNamespace } from '@jswork/event-mitt';
import { ReactHarmonyEvents } from '@jswork/harmony-events';

const CLASS_NAME = 'react-fly2cart';

export type ReactFly2CartProps = {
  /**
   * The target element or selector.
   */
  target: string | HTMLElement;
  /**
   * Trigger the fly to cart action manually.
   */
  manually?: boolean;
  /**
   * The cart direction.
   */
  direction?: 'top' | 'bottom';
  /**
   * The fly to cart event handler.
   */
  onFly2Cart?: () => void;
  /**
   * The fly element.
   */
  flyNode?: React.ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export default class ReactFly2Cart extends Component<ReactFly2CartProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static event: EventMittNamespace.EventMitt;
  static events = ['fly2cart'];
  static defaultProps = {
    name: '@',
    manually: false,
    direction: 'top'
  };

  private rootDom: HTMLSpanElement | null = null;
  private hiddenBallDom: HTMLDivElement | null = null;
  private harmonyEvents: ReactHarmonyEvents | null = null;

  get targetDom() {
    const { target } = this.props;
    return typeof target === 'string' ? document.querySelector(target) : target;
  }

  get ballCloned() {
    const ballDom = this.hiddenBallDom;
    const ball = ballDom?.firstElementChild as HTMLDivElement;
    const cloned = ball.cloneNode(true) as HTMLDivElement;
    document.body.appendChild(cloned);
    return cloned;
  }

  handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { onClick, manually } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (!manually) this.fly2cart();
    onClick?.(e);
  };

  /* ----- public eventBus methods ----- */
  fly2cart = () => {
    const { onFly2Cart } = this.props;
    const ball = this.ballCloned;
    const root = this.rootDom as HTMLElement;
    const rootBound = root.getBoundingClientRect();
    const cartBound = this.targetDom?.getBoundingClientRect()!;
    const ballBound = ball.getBoundingClientRect();

    const left = rootBound.left + rootBound.width / 2 - ball.offsetWidth / 2;
    const top = rootBound.top + rootBound.height / 2 - ball.offsetHeight / 2;
    const x = cartBound.left - rootBound.left - ballBound.width / 2;
    const y = -(rootBound.top + rootBound.height / 2 - cartBound.top - cartBound.height / 2);
    ball.style.cssText = `--left: ${left}px; --top: ${top}px; --x: ${x}px; --y: ${y}px;`;
    ball.onanimationend = () => {
      ball.remove();
      onFly2Cart?.();
    };
  };

  componentDidMount() {
    this.harmonyEvents = ReactHarmonyEvents.create(this);
  }

  componentWillUnmount() {
    this.harmonyEvents?.destroy();
  }

  render() {
    const { className, children, target, onClick, manually, direction, flyNode, ...rest } =
      this.props;
    return (
      <>
        <span
          data-component={CLASS_NAME}
          className={cx(CLASS_NAME, className)}
          onClick={this.handleClick}
          ref={(el) => (this.rootDom = el)}
          {...rest}>
          {children}
        </span>
        <div ref={(el) => (this.hiddenBallDom = el)} hidden className={`${CLASS_NAME}-hidden`}>
          <div data-direction={direction} className={`${CLASS_NAME}-ball`}>
            <div className="react-fly2cart-ball-inner">{flyNode}</div>
          </div>
        </div>
      </>
    );
  }
}
