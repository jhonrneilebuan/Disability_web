import React from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const FormatTimeDate = ({ date }) => {
  const customLocale = {
    ...enUS,
    formatDistance: (token, count, options) => {
      const result = enUS.formatDistance(token, count, options);
      return result.replace("about ", "");
    },
  };

  return (
    <p>
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: customLocale,
      })}
    </p>
  );
};

export default FormatTimeDate;
