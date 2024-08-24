import RcComponent from '.';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    RcComponent.event.emit(`${name}:${command}`, ...args);

  // the command repository:
  const fly2cart = () => execute('fly2cart');

  return {
    fly2cart,
  };
};

export default useCommand;
