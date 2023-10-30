import BangCap from './bang-cap';
import ChungChi from './chung-chi';

interface IBangCapChungChi {
	certificates: ICertsEmployee[];
	qualifications: IQualificationEmployee[];
	idEmp: string;
}

const BangCapChungChi = ({
	certificates,
	qualifications,
	idEmp,
}: IBangCapChungChi) => {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="panel">
				<BangCap qualifications={qualifications} idEmp={idEmp} />
			</div>
			<div className="panel">
				<ChungChi certifications={certificates} idEmp={idEmp} />
			</div>
		</div>
	);
};

export default BangCapChungChi;
