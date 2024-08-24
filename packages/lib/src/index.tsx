import cx from 'classnames';
import React, { Component, HTMLAttributes } from 'react';

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
} & HTMLAttributes<HTMLSpanElement>;

export default class ReactFly2Cart extends Component<ReactFly2CartProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    createBall,
    ballClassName: '',
    manually: false,
  };

  private rootDom: HTMLSpanElement | null = null;

  get targetDom() {
    const { target } = this.props;
    return typeof target === 'string' ? document.querySelector(target) : target;
  }

  handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { onClick, manually } = this.props;
    if (manually) return;
    e.preventDefault();
    e.stopPropagation();
    this.fly2cart();
    onClick?.(e);
  };

  fly2cart = () => {
    const { createBall, ballClassName } = this.props;
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
    ball.onanimationend = () => ball.remove();
  };

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
