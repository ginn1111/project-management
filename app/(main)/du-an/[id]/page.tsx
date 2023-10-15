import QuanLyDuAn from '@/components/pages/quan-ly-du-an';

const DuAn = ({ params }: IRouterParams<{ id: string }>) => {
  const { id } = params;
  return (
    <div className="flex overflow-x-auto">
      <QuanLyDuAn />
    </div>
  );
};

export default DuAn;
