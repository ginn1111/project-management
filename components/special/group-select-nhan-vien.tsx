import ReactSelect from '../ui/react-select';

interface IGroupSelectNhanVien {
  isMulti?: boolean;
}

const GroupSelectNhanVien = ({ isMulti = false }: IGroupSelectNhanVien) => {
  return (
    <>
      <div className="custom-select flex items-center gap-4">
        <ReactSelect
          containerClass="flex-1"
          title="Phòng ban"
          placeholder="phòng ban"
          options={[
            {
              value: 'Test1',
              label: 'Test label1',
            },
            {
              value: 'Test2',
              label: 'Test label2',
            },
            {
              value: 'Test3',
              label: 'Test label3',
            },
            {
              value: 'Test4',
              label: 'Test label4',
            },
          ]}
        />
        <ReactSelect
          title="Chuyên môn"
          placeholder="chuyên môn"
          containerClass="flex-1"
          options={[
            {
              value: 'Test1',
              label: 'Test label1',
            },
            {
              value: 'Test2',
              label: 'Test label2',
            },
            {
              value: 'Test3',
              label: 'Test label3',
            },
            {
              value: 'Test4',
              label: 'Test label4',
            },
          ]}
        />
      </div>
      <div className="custom-select">
        <ReactSelect
          title="Nhân viên"
          placeholder="nhân viên"
          isMulti={isMulti}
          options={[
            {
              value: 'Test',
              label: 'Test label',
            },
            {
              value: 'Test1',
              label: 'Test label',
            },
            {
              value: 'Test2',
              label: 'Test label',
            },
            {
              value: 'Test3',
              label: 'Test label',
            },
          ]}
        />
      </div>
    </>
  );
};

export default GroupSelectNhanVien;
