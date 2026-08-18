import React from "react";
import { Link } from "react-router";

const List = ({ id, category, title, date, NoPage, onClick }) => {
  // カテゴリー名を取得（配列やオブジェクトに対応）
  const catName = Array.isArray(category) ? category[0] : (typeof category === 'object' ? category?.name : category) || 'works';

  return (
    <div className="card gap-4">
      <div className="text-area text-left col-span-1 md:col-span-2 flex gap-1 ml-2">
        {onClick ? (
          <div onClick={onClick} className="title text-xxs py-[3px] hover:underline cursor-pointer ">
            {title}
          </div>
        ) : NoPage ? (
          <div className="title text-xxs">{title}</div>
        ) : (
          <Link to={`/${catName}/${id}`} className="hover:underline">
            <div className="title text-[6px] md:text-xxs py-[1px] md:py-[3px]">{title}</div>
          </Link>
        )}
        {/* <div className="date text-xxs">,{date?.slice(0, 4)}</div> */}
      </div>
    </div>
  );
};

export default List;
