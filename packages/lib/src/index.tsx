import cx from 'classnames';
import React, { Component, HTMLAttributes } from 'react';
import type { EventMittNamespace } from '@jswork/event-mitt';
import { ReactHarmonyEvents } from '@jswork/harmony-events';

const CLASS_NAME = 'react-fly2cart';
const createBall = (className: string) => {
  const ball = document.createElement('div');
  ball.className = cx(className, 'react-fly2cart-ball');
  ball.innerHTML = '<div class="react-fly2cart-ball-inner"></div>';
  document.body.appendChild(ball);
  return ball;
};

export type ReactFly2CartProps = {
  /**
   * Create a ball element.
   */
  createBall?: (className: string) => HTMLElement;
  /**
   * The ball class name.
   */
  ballClassName?: string;
  /**
   * The target element or selector.
   */
  target: string | HTMLElement;
  /**
   * Trigger the fly to cart action manually.
   */
  manually?: boolean;
  /**
   * The fly to cart event handler.
   */
  onFly2Cart?: () => void;
} & HTMLAttributes<HTMLSpanElement>;

export default class ReactFly2Cart extends Component<ReactFly2CartProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static event: EventMittNamespace.EventMitt;
  static events = ['fly2cart'];
  static defaultProps = {
    name: '@',
    createBall,
    ballClassName: '',
    manually: false,
  };

  private rootDom: HTMLSpanElement | null = null;
  private harmonyEvents: ReactHarmonyEvents | null = null;

  get targetDom() {
    const { target } = this.props;
    return typeof target === 'string' ? document.querySelector(target) : target;
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
    const { createBall, ballClassName, onFly2Cart } = this.props;
    const ball = createBall?.(ballClassName as string) as HTMLElement;
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
    const { className, children, createBall, ballClassName, target, onClick, manually, ...rest } = this.props;
    return (
      <span
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        onClick={this.handleClick}
        ref={(el) => (this.rootDom = el)}
        {...rest}>
        {children}
      </span>
    );
  }
}
