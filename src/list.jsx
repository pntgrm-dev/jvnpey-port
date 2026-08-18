import React from "react";
import { Link } from "react-router";

const List = ({ id, category, title, date, NoPage, onClick }) => {
  // カテゴリー名を取得（配列やオブジェクトに対応）
  const catName = Array.isArray(category) ? category[0] : (typeof category === 'object' ? category?.name : category) || 'works';

  return (
    <div className="card gap-4 min-w-0">
      <div className="text-area text-left col-span-1 md:col-span-2 flex gap-1 ml-2 min-w-0 w-full">
        {onClick ? (
          <div onClick={onClick} className="title min-w-0 max-w-full text-xxs py-[3px] leading-snug break-words hover:underline cursor-pointer [overflow-wrap:anywhere]">
            {title}
          </div>
        ) : NoPage ? (
          <div className="title min-w-0 max-w-full text-xxs leading-snug break-words [overflow-wrap:anywhere]">{title}</div>
        ) : (
          <Link to={`/${catName}/${id}`} className="hover:underline min-w-0 max-w-full block">
            <div className="title min-w-0 max-w-full text-tiny md:text-xxs py-[1px] md:py-[3px] leading-snug break-words [overflow-wrap:anywhere]">{title}</div>
          </Link>
        )}
        {/* <div className="date text-xxs">,{date?.slice(0, 4)}</div> */}
      </div>
    </div>
  );
};

export default List;
