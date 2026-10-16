"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 text-sm">
      Loading Map...
    </div>
  ),
});

export default function ContactMap() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg h-[300px] sm:h-[400px]">
      <LeafletMap
        center={[24.433332, 54.618496]}
        zoom={16}
        markerPosition={[24.433332, 54.618496]}
        popupText="CopyM Limited — Incubator Building, Masdar City, Abu Dhabi"
      />
    </div>
  );
}
