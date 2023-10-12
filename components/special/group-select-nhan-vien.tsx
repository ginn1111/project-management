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
              value: 'fuck1',
              label: 'Fuck label1',
            },
            {
              value: 'fuck2',
              label: 'Fuck label2',
            },
            {
              value: 'fuck3',
              label: 'Fuck label3',
            },
            {
              value: 'fuck4',
              label: 'Fuck label4',
            },
          ]}
        />
        <ReactSelect
          title="Chuyên môn"
          placeholder="chuyên môn"
          containerClass="flex-1"
          options={[
            {
              value: 'fuck1',
              label: 'Fuck label1',
            },
            {
              value: 'fuck2',
              label: 'Fuck label2',
            },
            {
              value: 'fuck3',
              label: 'Fuck label3',
            },
            {
              value: 'fuck4',
              label: 'Fuck label4',
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
              value: 'fuck',
              label: 'Fuck label',
            },
            {
              value: 'fuck1',
              label: 'Fuck label',
            },
            {
              value: 'fuck2',
              label: 'Fuck label',
            },
            {
              value: 'fuck3',
              label: 'Fuck label',
            },
          ]}
        />
      </div>
    </>
  );
};

export default GroupSelectNhanVien;
