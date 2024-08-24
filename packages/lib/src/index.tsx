// import noop from '@jswork/noop';
import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes } from "react";

const CLASS_NAME = "react-fly2cart";
// const uuid = () => Math.random().toString(36).substring(2, 9);
export type ReactFly2CartProps = {
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The children element.
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default class ReactFly2Cart extends Component<ReactFly2CartProps> {
  static displayName = CLASS_NAME;
  static version = "__VERSION__";
  static defaultProps = {};

  render() {
    const { className, children,...rest } = this.props;
    return (
      <div data-component={CLASS_NAME} className={cx(CLASS_NAME, className)} {...rest}>
        {children}
      </div>
    );
  }
}
