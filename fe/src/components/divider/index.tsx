type Props = {
  className?: string;
};

import classNames from 'classnames/bind';

const Divider = ({ className }: Props) => {
  // return <div className={`w-full h-1 bg-slate-900 ${className}`}></div>;
  return <div className={classNames('w-full h-1 bg-slate-900', className)} />;
};

export default Divider;
