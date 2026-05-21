import classNames from "classnames";

const ProgressBar = ({ value = 0 }: { value: number }) => {
  const formattedValue = value <= 0 ? 0 : value >= 100 ? 100 : value;
  return (
    <div className={classNames("flex w-full items-center gap-1")}>
      <div
        className={classNames("w-full bg-white-3 border-2 h-3 border-black")}
      >
        <div
          className={classNames("w-full bg-violet-500 h-full")}
          style={{ width: `${formattedValue}%` }}
        />
      </div>
      <p className="text-sm">{value}%</p>
    </div>
  );
};

export default ProgressBar;
