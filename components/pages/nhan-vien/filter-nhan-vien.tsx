'use client';

import IconUserPlus from '@/components/Icon/IconUserPlus';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import React from 'react';

const FilterNhanVien = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-4">
        <Button>
          <IconUserPlus />
        </Button>
        <Search />
      </div>
      <div className="ml-auto gap-4 flex items-center">
        <Button>Tìm kiếm</Button>
        <Button variant="outline">Làm mới</Button>
      </div>
    </div>
  );
};

export default FilterNhanVien;
