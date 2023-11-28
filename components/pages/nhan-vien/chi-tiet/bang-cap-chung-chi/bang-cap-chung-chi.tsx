import BangCap from './bang-cap';
import ChungChi from './chung-chi';

interface IBangCapChungChi {
	idEmp: string;
}

const BangCapChungChi = ({ idEmp }: IBangCapChungChi) => {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="panel">
				<BangCap idEmp={idEmp} />
			</div>
			<div className="panel">
				<ChungChi idEmp={idEmp} />
			</div>
		</div>
	);
};

export default BangCapChungChi;
