import React from "react";

export default function SkeletonLoader() {
  return (
    <div className=" grid grid-flow-row gap-5 w-full mx-auto ">
      <div className="skeleton-card animate-pulse">
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-text title" />
        <div className="skeleton skeleton-text price" />
      </div>
      <div className="skeleton-card animate-pulse">
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-text title" />
        <div className="skeleton skeleton-text price" />
      </div>
      <div className="skeleton-card animate-pulse">
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-text title" />
        <div className="skeleton skeleton-text price" />
      </div>
    </div>
  );
}
