import React from "react";
import { Link } from "react-router";

const List = ({ id, category, title, date, NoPage }) => {
  // カテゴリー名を取得（配列やオブジェクトに対応）
  const catName = Array.isArray(category) ? category[0] : (typeof category === 'object' ? category?.name : category) || 'works';

  return (
    <div className="card gap-4">
      <div className="text-area text-left col-span-1 md:col-span-2 flex gap-1">
        {NoPage ? (
          <div className="title text-[12px]">{title}</div>
        ) : (
          <Link to={`/${catName}/${id}`} className="hover:underline">
            <div className="title text-[12px]">{title}</div>
          </Link>
        )}
        {/* <div className="date text-[10px]">,{date?.slice(0, 4)}</div> */}
      </div>
    </div>
  );
};

export default List;
