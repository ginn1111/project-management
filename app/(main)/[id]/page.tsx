import QuanLyDuAn from '@/components/pages/quan-ly-du-an';
import BoardDuAn from '@/components/pages/quan-ly-du-an/board-du-an';
import React from 'react';

const DuAn = ({ params }: IRouterParams<{ id: string }>) => {
  const { id } = params;
  return (
    <div className="flex overflow-x-auto">
      <QuanLyDuAn />
    </div>
  );
};

export default DuAn;
