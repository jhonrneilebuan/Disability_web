import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const FormatTimeDate = ({ date, formatType }) => {
  const customLocale = {
    ...enUS,
    formatDistance: (token, count, options) => {
      const result = enUS.formatDistance(token, count, options);
      return result.replace("about ", "");
    },
  };

  if (formatType === "date") {
    return <p>{format(new Date(date), "MMM dd, yyyy")}</p>;
  }

  if (formatType === "relative") {
    return (
      <p>
        {formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: customLocale,
        })}
      </p>
    );
  }

  return (
    <div>
      <p>{format(new Date(date), "MMM dd, yyyy")}</p>
      <p>
        {formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: customLocale,
        })}
      </p>
    </div>
  );
};

export default FormatTimeDate;
