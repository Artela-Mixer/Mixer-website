import { classNames } from "@/utils/classNames";
import Style from "./style.module.scss";

type ItemType = {
  value: string;
  label: string;
};

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
      className={classNames(
        Style["step-item"],
        isActive && Style["is-active"],
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      <Marker></Marker>
      <div className={classNames(Style["step-detail"], "text-white")}>
        {item.label}
      </div>
    </div>
  );
};

export const Step = ({ value, onChange, items = [] } : { value : string,onChange : (value: string) => void,items : ItemType[]}) => {

  return (
    <div
      className={classNames(Style.step, "flex flex-row w-full justify-around")}
    >
      {items?.map((item) => (
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
