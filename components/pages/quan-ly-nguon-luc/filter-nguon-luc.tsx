'use client';

import IconPlus from '@/components/Icon/IconPlus';
import IconRefresh from '@/components/Icon/IconRefresh';
import { Button } from '@/components/ui/button';
import ReactSelect from '@/components/ui/react-select';
import Search from '@/components/ui/search';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { getValueFromId } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModalThemNguonLuc from './modal/modal-them-nguon-luc';

interface IFilterNguonLuc {
  resourceTypeList: IResourceType[];
}

const FilterNguonLuc = ({ resourceTypeList }: IFilterNguonLuc) => {
  const router = useRouter();
  const { handlePush, handleReset, searchParams } = useQueryParams({
    initSearchParams: { search: '', page: 1, limit: 10, idResourceType: '' },
  });
  const [selectValue, setSelectValue] = useState(
    getValueFromId<IResourceType>(
      searchParams.idProject,
      resourceTypeList as IResourceType[]
    )
  );

  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNL: { open: false },
  });

  const [searchValue, setSearchValue] = useState(searchParams.search);

  useEffect(() => {
    setSelectValue(
      getValueFromId(searchParams.idResourceType, resourceTypeList)
    );
  }, [searchParams.idResourceType]);

  useEffect(() => {
    setSearchValue(searchParams.search);
  }, [searchParams.search]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handlePush({ search: searchValue ?? '', page: 1 });
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchValue]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 flex-1">
        <Button size="icon" onClick={() => handleOpenModal('modalNL')}>
          <IconPlus />
        </Button>
        <Search
          placeholder="tên vật tư"
          classNameContainer="w-full"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />

        <div className="w-[300px]">
          <ReactSelect
            className="z-10"
            placeholder="loại"
            title={null}
            value={selectValue}
            options={resourceTypeList?.map(({ name, id }: IResourceType) => ({
              value: id,
              label: name,
            }))}
            onChange={(newValue) => {
              handlePush({ idResourceType: (newValue as any).value, page: 1 });
            }}
          />
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          handleReset();
          setSearchValue('');
        }}
      >
        <IconRefresh />
      </Button>
      <ModalThemNguonLuc
        title="Thêm nguồn lực"
        onClose={() => handleCloseModal('modalNL')}
        open={modal.modalNL.open}
        onRefresh={() => {
          router.refresh();
        }}
      />
    </div>
  );
};

export default FilterNguonLuc;
