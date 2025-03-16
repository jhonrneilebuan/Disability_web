import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const FormatTimeDate = ({ date, formatType }) => {

  if (!date || isNaN(new Date(date))) {
    return <span className="text-gray-500">Invalid Date</span>; 
  }

  const customLocale = {
    ...enUS,
    formatDistance: (token, count, options) => {
      const result = enUS.formatDistance(token, count, options);
      return result.replace("about ", "");
    },
  };

  if (formatType === "date") {
    return <span>{format(new Date(date), "MMM dd, yyyy")}</span>;
  }

  if (formatType === "relative") {
    return (
      <span>
        {formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: customLocale,
        })}
      </span>
    );
  }

  return (
    <>
      <span>{format(new Date(date), "MMM dd, yyyy")}</span>
      <span>
        {formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: customLocale,
        })}
      </span>
    </>
  );
};

export default FormatTimeDate;
