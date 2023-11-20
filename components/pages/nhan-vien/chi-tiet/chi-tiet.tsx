import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BangCapChungChi from './bang-cap-chung-chi';
import ThongTin from './thong-tin';
import Workload from './workload';

const ChiTietNhanVien = ({ detail }: { detail: any }) => {
	const { certificates, qualifications, ...employee } = detail.data;
	return (
		<div className="m-2 p-2">
			<Tabs defaultValue="thong-tin">
				<TabsList className="w-full">
					<TabsTrigger className="flex-1" value="thong-tin">
						Thông tin
					</TabsTrigger>
					<TabsTrigger className="flex-1" value="bc-cc">
						Bằng cấp - chứng chỉ
					</TabsTrigger>
					<TabsTrigger className="flex-1" value="workload">
						Workload
					</TabsTrigger>
				</TabsList>
				<TabsContent value="thong-tin">
					<ThongTin employee={employee} />
				</TabsContent>
				<TabsContent value="bc-cc">
					<BangCapChungChi
						idEmp={employee.id}
						certificates={certificates}
						qualifications={qualifications}
					/>
				</TabsContent>
				<TabsContent value="workload">
					<Workload />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ChiTietNhanVien;
