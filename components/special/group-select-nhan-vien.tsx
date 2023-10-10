import ReactSelect from '../ui/react-select';

interface IGroupSelectNhanVien {
  isMulti?: boolean;
}

const GroupSelectNhanVien = ({ isMulti = false }: IGroupSelectNhanVien) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <ReactSelect
          containerClass="flex-1"
          title="Phòng ban"
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
      <ReactSelect
        title="Nhân viên"
        isMulti={isMulti}
        options={[
          {
            value: 'fuck',
            label: 'Fuck label',
          },
          {
            value: 'fuck',
            label: 'Fuck label',
          },
          {
            value: 'fuck',
            label: 'Fuck label',
          },
          {
            value: 'fuck',
            label: 'Fuck label',
          },
        ]}
      />
    </>
  );
};

export default GroupSelectNhanVien;
