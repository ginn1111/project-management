'use client';

import IconRefresh from '@/components/Icon/IconRefresh';
import { Button } from '@/components/ui/button';
import ReactSelect from '@/components/ui/react-select';
import useQueryParams from '@/hooks/useQueryParams';
import { useEffect, useState } from 'react';

function getValueFromId(idProject: string, dataList: IProject[]) {
  const dfValue = dataList.find(({ id }) => id === idProject);

  return dfValue ? { label: dfValue.name, value: dfValue.id } : null;
}

interface IFilterDuyetDXND {
  projects: IProject[];
}

const FilterDuyetDXNV = ({ projects }: IFilterDuyetDXND) => {
  const { handlePush, handleReset, searchParams } = useQueryParams({
    initSearchParams: { idProject: '', page: 1, limit: 10 },
  });

  const [selectValue, setSelectValue] = useState(
    getValueFromId(searchParams.idProject, projects)
  );

  useEffect(() => {
    setSelectValue(getValueFromId(searchParams.idProject, projects));
  }, [searchParams.idProject]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-full max-w-[400px]">
        <ReactSelect
          className="z-10"
          placeholder="dự án"
          title={null}
          value={selectValue}
          options={projects.map(({ name, id }) => ({
            value: id,
            label: name,
          }))}
          onChange={(newValue) => {
            handlePush({ idProject: (newValue as any).value });
          }}
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" onClick={handleReset}>
          <IconRefresh />
        </Button>
      </div>
    </div>
  );
};

export default FilterDuyetDXNV;
