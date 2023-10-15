import IconRefresh from '@/components/Icon/IconRefresh';
import IconSearch from '@/components/Icon/IconSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReactSelect from '@/components/ui/react-select';

const Filter = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <ReactSelect
        className="min-w-[300px]"
        placeholder="dự án"
        options={[{ label: 'DA1', value: 'DA1' }]}
        title=""
      />
      <Input type="date" />
      <Input type="date" />
      <div className="flex items-center gap-2">
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
