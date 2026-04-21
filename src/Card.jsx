import React from "react";
import { Link } from "react-router";

const Card = ({ id, category, title, date }) => {
  // カテゴリー名を取得（配列やオブジェクトに対応）
  const catName = Array.isArray(category) ? category[0] : (typeof category === 'object' ? category?.name : category) || 'works';

  return (
    <div className="card gap-4">
      <div className="text-area text-left col-span-1 md:col-span-2 flex gap-4">
        <Link to={`/${catName}/${id}`} className="hover:underline">
          <div className="title text-[10px]">{title}</div>
        </Link>
      </div>
    </div>
  );
};

export default Card;