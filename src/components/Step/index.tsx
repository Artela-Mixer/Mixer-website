import { classNames } from "@/utils/classNames";
import Style from "./style.module.scss";

const Marker = () => {
  return (
    <div className={classNames(Style.marker)}>
      <div className={classNames(Style.circle)}></div>
    </div>
  );
};

const StepItem = ({ item, isActive, onClick }) => {
  return (
    <div
      className={classNames(Style["step-item"],isActive && Style["is-active"], "cursor-pointer")}
      onClick={onClick}
    >
      <Marker></Marker>
      <div className={classNames(Style["step-detail"], "text-white")}>
        {item.label}
      </div>
    </div>
  );
};

export const Step = ({ value, onChange }) => {
  const data = [
    { value: "1", label: "0.1ETH" },
    { value: "2", label: "0.2ETH" },
  ];

  return (
    <div className={classNames(Style.step, "flex flex-row w-full justify-around")}>
      {data?.map((item) => (
        <StepItem
          key={item.value}
          item={item}
          isActive={value === item.value}
          onClick={() => onChange(item.value)}
        ></StepItem>
      ))}
    </div>
  );
};