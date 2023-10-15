import IconRefresh from '@/components/Icon/IconRefresh';
import IconSearch from '@/components/Icon/IconSearch';
import { Button } from '@/components/ui/button';
import ReactSelect from '@/components/ui/react-select';

const Filter = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full max-w-[400px]">
        <ReactSelect
          placeholder="dự án"
          title={null}
          options={[
            {
              label: 'Dự án',
              value: 'Du an1',
            },
            {
              label: 'Dự án',
              value: 'Du an2',
            },
          ]}
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline">
          <IconRefresh />
        </Button>
        <Button>
          <IconSearch />
        </Button>
      </div>
    </div>
  );
};

export default Filter;
